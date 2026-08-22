import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import { onboardingApi } from '@/services/api/onboarding';
import type { ImporterApplication, ImporterOnboardingDraft } from '@/types/importerOnboarding';

import {
  clearImporterOnboarding,
  defaultImporterOnboardingDraft,
  loadImporterApplicationId,
  loadImporterOnboardingDraft,
  saveImporterApplication,
  saveImporterOnboardingDraft,
  setExplicitResume,
} from './importerOnboardingStorage';

type ImporterOnboardingContextValue = {
  draft: ImporterOnboardingDraft;
  application: ImporterApplication | undefined;
  applicationId: string | undefined;
  error: string | undefined;
  loading: boolean;
  updateDraft: (changes: Partial<ImporterOnboardingDraft>) => void;
  saveStep: (step: 1 | 2 | 3) => Promise<boolean>;
  lookupApplication: (applicationId: string, trackOnly?: boolean) => Promise<number | undefined>;
  submit: () => Promise<boolean>;
  submitAdditionalInformation: (message: string) => Promise<boolean>;
  refreshStatus: () => Promise<void>;
  startNewApplication: () => Promise<void>;
};

const OnboardingContext = createContext<ImporterOnboardingContextValue | undefined>(undefined);

export function ImporterOnboardingProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState(defaultImporterOnboardingDraft);
  const [application, setApplication] = useState<ImporterApplication>();
  const [applicationId, setApplicationId] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void Promise.all([loadImporterOnboardingDraft(), loadImporterApplicationId()]).then(
      ([storedDraft, storedApplicationId]) => {
        setDraft(storedDraft);
        setApplicationId(storedApplicationId ?? undefined);
        setLoading(false);
      },
    );
  }, []);

  const updateDraft = (changes: Partial<ImporterOnboardingDraft>) => {
    setDraft((current) => {
      const next = { ...current, ...changes };
      void saveImporterOnboardingDraft(next);
      return next;
    });
  };

  const saveStep = async (_step: 1 | 2 | 3) => {
    setError(undefined);
    setLoading(true);
    try {
      const nextApplication = applicationId
        ? await onboardingApi.updateImporterApplication(applicationId, draft)
        : await onboardingApi.createImporterApplication(draft);
      setApplication(nextApplication);
      setApplicationId(nextApplication.applicationId);
      await saveImporterApplication(nextApplication, draft);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save this step.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const lookupApplication = async (id: string, trackOnly = false) => {
    setError(undefined);
    setLoading(true);
    try {
      const nextApplication = await onboardingApi.getImporterApplication(id.trim());
      setApplication(nextApplication);
      setApplicationId(nextApplication.applicationId);
      await saveImporterApplication(nextApplication, draft);
      await setExplicitResume(!trackOnly);
      return trackOnly ? 5 : nextApplication.progress?.currentStep ?? 1;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Application lookup failed.');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!applicationId) {
      const created = await saveStep(1);
      if (!created) return false;
    }
    const id = applicationId ?? (await loadImporterApplicationId());
    if (!id) return false;
    setLoading(true);
    setError(undefined);
    try {
      const nextApplication = await onboardingApi.submitImporterApplication(id, true);
      setApplication(nextApplication);
      await saveImporterApplication(nextApplication, draft);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to submit application.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitAdditionalInformation = async (message: string) => {
    if (!applicationId || !message.trim()) return false;
    setLoading(true);
    setError(undefined);
    try {
      const nextApplication = await onboardingApi.submitAdditionalInformation(
        applicationId,
        message.trim(),
        draft,
      );
      setApplication(nextApplication);
      await saveImporterApplication(nextApplication, draft);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to send updates.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    if (!applicationId) return;
    setLoading(true);
    setError(undefined);
    try {
      const nextApplication = await onboardingApi.getImporterApplication(applicationId);
      setApplication(nextApplication);
      await saveImporterApplication(nextApplication, draft);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to refresh application status.');
    } finally {
      setLoading(false);
    }
  };

  const startNewApplication = async () => {
    await clearImporterOnboarding();
    setDraft(defaultImporterOnboardingDraft);
    setApplication(undefined);
    setApplicationId(undefined);
    setError(undefined);
  };

  return (
    <OnboardingContext.Provider
      value={{
        application,
        applicationId,
        draft,
        error,
        loading,
        lookupApplication,
        refreshStatus,
        saveStep,
        startNewApplication,
        submit,
        submitAdditionalInformation,
        updateDraft,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useImporterOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useImporterOnboarding must be used inside the onboarding provider');
  return context;
}
