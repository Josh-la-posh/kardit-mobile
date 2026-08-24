import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ImporterApplication, ImporterOnboardingDraft } from '@/types/importerOnboarding';

export const importerOnboardingStorageKeys = {
  applicationId: 'kardit.importerOnboarding.applicationId.v1',
  draft: 'kardit.importerOnboarding.draft.v1',
  explicitResume: 'kardit.importerOnboarding.explicitResume.v1',
  stakeholderType: 'kardit.onboarding.stakeholderType.v1',
};

export const defaultImporterOnboardingDraft: ImporterOnboardingDraft = {
  addressCity: '',
  addressCountry: '',
  addressLine1: '',
  addressState: '',
  businessActivity: '',
  businessEmail: '',
  businessPhone: '',
  businessSector: '',
  businessStatus: '',
  businessType: 'RegisteredBusiness',
  cacNumber: '',
  currentStatus: 'DRAFT',
  declarationAccepted: false,
  documents: {},
  email: '',
  expectedImportValue: '',
  fullName: '',
  importCategories: [],
  importFrequency: '',
  legalBusinessName: '',
  nin: '',
  phone: '',
  role: '' as ImporterOnboardingDraft['role'],
  taxId: '',
};

export async function loadImporterOnboardingDraft() {
  const stored = await AsyncStorage.getItem(importerOnboardingStorageKeys.draft);
  if (!stored) return defaultImporterOnboardingDraft;

  try {
    return {
      ...defaultImporterOnboardingDraft,
      ...(JSON.parse(stored) as Partial<ImporterOnboardingDraft>),
    };
  } catch {
    return defaultImporterOnboardingDraft;
  }
}

export async function saveImporterOnboardingDraft(draft: ImporterOnboardingDraft) {
  await AsyncStorage.setItem(importerOnboardingStorageKeys.draft, JSON.stringify(draft));
}

export async function saveImporterApplication(
  application: ImporterApplication,
  draft: ImporterOnboardingDraft = defaultImporterOnboardingDraft,
) {
  await AsyncStorage.setItem(
    importerOnboardingStorageKeys.applicationId,
    application.applicationId,
  );
  await saveImporterOnboardingDraft({
    ...draft,
    currentStatus: application.currentStatus ?? 'SUBMITTED',
    documents: application.documents ?? draft.documents,
    referenceNumber: application.referenceNumber,
    rejectionReason: application.rejectionReason,
    submittedAt: application.submittedAt,
  });
}

export async function persistImporterStakeholderType() {
  await AsyncStorage.setItem(importerOnboardingStorageKeys.stakeholderType, 'importer');
}

export async function loadImporterApplicationId() {
  return AsyncStorage.getItem(importerOnboardingStorageKeys.applicationId);
}

export async function setExplicitResume(value: boolean) {
  await AsyncStorage.setItem(importerOnboardingStorageKeys.explicitResume, String(value));
}

export async function clearImporterOnboarding() {
  await AsyncStorage.multiRemove([
    importerOnboardingStorageKeys.applicationId,
    importerOnboardingStorageKeys.draft,
    importerOnboardingStorageKeys.explicitResume,
  ]);
}
