import { env } from '@/config/env';
import type {
  ImporterApplication,
  ImporterOnboardingDraft,
  ImporterOnboardingOptions,
} from '@/types/importerOnboarding';
import type { OnboardingStatus } from '@/types/session';

import { ApiError } from './apiError';
import { apiClient } from './client';

const onboardingBasePath = '/api/v1/importers/onboarding';

const createCorrelationId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `mobile-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const mapApplication = (raw: Record<string, unknown>): ImporterApplication => ({
  applicationId: String(raw.applicationId ?? raw.id ?? raw.ApplicationId ?? raw.Id ?? ''),
  currentStatus: (raw.status ?? raw.currentStatus ?? raw.Status ?? raw.CurrentStatus) as
    ImporterApplication['currentStatus'] | undefined,
  documents: raw.documents as ImporterApplication['documents'],
  raw,
  referenceNumber: String(
    raw.referenceNumber ??
      raw.applicationReference ??
      raw.ReferenceNumber ??
      raw.ApplicationReference ??
      '',
  ),
  rejectionReason: String(
    raw.rejectionReason ??
      raw.rejectedReason ??
      raw.decisionReason ??
      raw.reason ??
      raw.RejectionReason ??
      '',
  ),
  submittedAt: String(
    raw.submittedAt ??
      raw.submittedDate ??
      raw.createdAt ??
      raw.SubmittedAt ??
      raw.SubmittedDate ??
      raw.CreatedAt ??
      '',
  ),
});

const appendDraftFields = (formData: FormData, draft: ImporterOnboardingDraft) => {
  formData.append('importerType', 'RegisteredBusiness');
  formData.append('businessType', draft.businessType);
  formData.append('organization.cacRcBnNumber', draft.cacNumber);
  formData.append('organization.taxId', draft.taxId);
  formData.append('organization.legalBusinessName', draft.legalBusinessName);
  formData.append('organization.businessStatus', draft.businessStatus);
  formData.append('organization.businessEmail', draft.businessEmail);

  // TODO: Confirm whether backend expects profile.* or organization.* address fields.
  formData.append('profile.addressLine1', draft.addressLine1);
  formData.append('profile.addressLine2', draft.addressLine2 ?? '');
  formData.append('profile.addressCountry', draft.addressCountry);
  formData.append('profile.addressState', draft.addressState);
  formData.append('profile.addressCity', draft.addressCity);
  formData.append('profile.businessPhone', draft.businessPhone);
  formData.append('profile.sector', draft.businessSector);
  formData.append('profile.activity', draft.businessActivity);
  draft.importCategories.forEach((category) => formData.append('profile.categories', category));
  formData.append('profile.otherCategory', draft.otherImportCategory ?? '');
  formData.append('profile.frequency', draft.importFrequency);
  formData.append('profile.expectedValue', draft.expectedImportValue);

  formData.append('applicant.fullName', draft.fullName);
  formData.append('applicant.role', draft.role);
  formData.append('applicant.nin', draft.nin);
  formData.append('applicant.phone', draft.phone);
  formData.append('applicant.email', draft.email);
};

const importerOnboardingRequest = async <TResponse>(path: string, init: RequestInit = {}) => {
  if (!env.apiBaseUrl) {
    throw new ApiError('Missing EXPO_PUBLIC_API_BASE_URL', 0, undefined);
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'X-Correlation-ID': createCorrelationId(),
      'X-Tenant-Id': 'public',
      ...(init.headers ?? {}),
    },
  });

  const body = await response.text();
  const parsed = body ? (JSON.parse(body) as TResponse) : (undefined as TResponse);

  if (!response.ok) {
    throw new ApiError(`Request failed (${response.status})`, response.status, parsed);
  }

  return parsed;
};

// TODO: Keep these importer onboarding contracts aligned with backend before enabling real submission.
export const onboardingApi = {
  createImporterApplication: async (draft: ImporterOnboardingDraft) => {
    const formData = new FormData();
    appendDraftFields(formData, draft);
    const response = await importerOnboardingRequest<Record<string, unknown>>(
      `${onboardingBasePath}/applications`,
      { body: formData, method: 'POST' },
    );
    return mapApplication(response);
  },
  getApplicationStatus: () =>
    apiClient.get<{ status: string; nextStep?: string }>('/importers/onboarding/status'),
  getImporterApplication: async (applicationId: string) => {
    const response = await importerOnboardingRequest<Record<string, unknown>>(
      `${onboardingBasePath}/applications/${applicationId}`,
    );
    return mapApplication(response);
  },
  getImporterApplicationOverview: (applicationId: string) =>
    importerOnboardingRequest<unknown>(
      `${onboardingBasePath}/applications/${applicationId}/overview`,
    ),
  getImporterOnboardingOptions: () =>
    importerOnboardingRequest<ImporterOnboardingOptions>(`${onboardingBasePath}/options`),
  getOnboardingStatus: () =>
    apiClient.get<{ nextStep?: string; status: OnboardingStatus }>('/importers/onboarding/status'),
  saveApplicantDetails: (payload: unknown) =>
    apiClient.post<{ saved: boolean }>('/importers/onboarding/applicant', payload),
  submitApplication: (payload: unknown) =>
    apiClient.post<{ submitted: boolean }>('/importers/onboarding/submit', payload),
  submitDocuments: (payload: unknown) =>
    apiClient.post<{ submitted: boolean }>('/importers/onboarding/documents', payload),
  submitImporterApplication: async (applicationId: string, declarationAccepted: boolean) => {
    const response = await importerOnboardingRequest<Record<string, unknown>>(
      `${onboardingBasePath}/applications/${applicationId}/submit`,
      {
        body: JSON.stringify({ declarationAccepted }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    );
    return mapApplication(response);
  },
  updateImporterApplication: async (applicationId: string, draft: ImporterOnboardingDraft) => {
    const formData = new FormData();
    appendDraftFields(formData, draft);
    const response = await importerOnboardingRequest<Record<string, unknown>>(
      `${onboardingBasePath}/applications/${applicationId}`,
      { body: formData, method: 'PUT' },
    );
    return mapApplication(response);
  },
};
