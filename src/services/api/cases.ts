import type { CreateSupportCaseRequest, SupportCase } from '@/types/case';

import { apiClient } from './client';

// TODO: Confirm case types, attachment handling, update threads, and service-provider platform contract.
export const casesApi = {
  listCases: () => apiClient.get<SupportCase[]>('/importers/cases'),
  getCase: (caseId: string) => apiClient.get<SupportCase>(`/importers/cases/${caseId}`),
  createCase: (request: CreateSupportCaseRequest) =>
    apiClient.post<SupportCase>('/importers/cases', request),
  respondToAdditionalInformation: (
    caseId: string,
    request: { attachmentIds?: string[]; message: string },
  ) => apiClient.post<SupportCase>(`/importers/cases/${caseId}/additional-information`, request),
};
