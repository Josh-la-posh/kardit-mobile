import type {
  CreateSupportCaseRequest,
  SupportCase,
  SupportCaseEvidence,
  SupportCaseUpdate,
} from '@/types/case';

import { apiClient } from './client';

// TODO: Confirm case types, attachment handling, update threads, and service-provider platform contract.
export const casesApi = {
  getCases: () => apiClient.get<SupportCase[]>('/importers/cases'),
  listCases: () => apiClient.get<SupportCase[]>('/importers/cases'),
  getCaseDetails: (caseId: string) => apiClient.get<SupportCase>(`/importers/cases/${caseId}`),
  getCase: (caseId: string) => apiClient.get<SupportCase>(`/importers/cases/${caseId}`),
  createCase: (request: CreateSupportCaseRequest) =>
    apiClient.post<SupportCase>('/importers/cases', request),
  addCaseEvidence: (caseId: string, request: { fileName: string; uri?: string }) =>
    apiClient.post<SupportCaseEvidence>(`/importers/cases/${caseId}/evidence`, request),
  respondToCaseInformationRequest: (
    caseId: string,
    request: { attachmentIds?: string[]; message: string },
  ) => apiClient.post<SupportCase>(`/importers/cases/${caseId}/information-request`, request),
  respondToAdditionalInformation: (
    caseId: string,
    request: { attachmentIds?: string[]; message: string },
  ) => apiClient.post<SupportCase>(`/importers/cases/${caseId}/additional-information`, request),
  getCaseUpdates: (caseId: string) =>
    apiClient.get<SupportCaseUpdate[]>(`/importers/cases/${caseId}/updates`),
  closeCase: (caseId: string) =>
    apiClient.post<{ closed: boolean }>(`/importers/cases/${caseId}/close`, {}),
  reopenCase: (caseId: string) =>
    apiClient.post<{ reopened: boolean }>(`/importers/cases/${caseId}/reopen`, {}),
};
