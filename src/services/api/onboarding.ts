import { apiClient } from './client';
import type { OnboardingStatus } from '@/types/session';

// TODO: Replace placeholder onboarding paths and payloads with confirmed backend contracts.
export const onboardingApi = {
  getApplicationStatus: () =>
    apiClient.get<{ status: string; nextStep?: string }>('/importers/onboarding/status'),
  getOnboardingStatus: () =>
    apiClient.get<{ nextStep?: string; status: OnboardingStatus }>('/importers/onboarding/status'),
  saveApplicantDetails: (payload: unknown) =>
    apiClient.post<{ saved: boolean }>('/importers/onboarding/applicant', payload),
  submitDocuments: (payload: unknown) =>
    apiClient.post<{ submitted: boolean }>('/importers/onboarding/documents', payload),
  submitApplication: (payload: unknown) =>
    apiClient.post<{ submitted: boolean }>('/importers/onboarding/submit', payload),
};
