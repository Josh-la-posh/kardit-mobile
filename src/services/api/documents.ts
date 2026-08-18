import type {
  ComplianceDocument,
  ComplianceDocumentRequirement,
  DocumentUploadRequest,
} from '@/types/document';

import { apiClient } from './client';

// TODO: Confirm upload transport, accepted document formats, validation states, and document access URLs.
export const documentsApi = {
  getDocuments: () => apiClient.get<ComplianceDocument[]>('/importers/documents'),
  getDocumentDetails: (documentId: string) =>
    apiClient.get<ComplianceDocument>(`/importers/documents/${documentId}`),
  getRequiredDocumentsForPayment: (paymentId: string) =>
    apiClient.get<ComplianceDocumentRequirement[]>(
      `/importers/payments/${paymentId}/document-requirements`,
    ),
  listDocumentsForTransaction: (transactionId: string) =>
    apiClient.get<ComplianceDocument[]>(`/importers/transactions/${transactionId}/documents`),
  uploadDocument: (request: DocumentUploadRequest) =>
    apiClient.post<ComplianceDocument>('/importers/documents', request),
  attachDocumentToTransaction: (documentId: string, transactionId: string) =>
    apiClient.post<ComplianceDocument>(`/importers/documents/${documentId}/attach`, {
      transactionId,
    }),
  linkDocumentToTransaction: (documentId: string, transactionId: string) =>
    apiClient.post<ComplianceDocument>(`/importers/documents/${documentId}/link`, {
      transactionId,
    }),
  validateDocument: (documentId: string) =>
    apiClient.post<{ status: ComplianceDocument['status'] }>(
      `/importers/documents/${documentId}/validate`,
      {},
    ),
  getDocumentStatus: (documentId: string) =>
    apiClient.get<{ status: ComplianceDocument['status'] }>(
      `/importers/documents/${documentId}/status`,
    ),
  getDocument: (documentId: string) =>
    apiClient.get<ComplianceDocument>(`/importers/documents/${documentId}`),
};
