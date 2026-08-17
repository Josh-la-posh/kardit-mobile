import type { ComplianceDocument, DocumentUploadRequest } from '@/types/document';

import { apiClient } from './client';

// TODO: Confirm upload transport, accepted document formats, validation states, and document access URLs.
export const documentsApi = {
  listDocumentsForTransaction: (transactionId: string) =>
    apiClient.get<ComplianceDocument[]>(`/importers/transactions/${transactionId}/documents`),
  uploadDocument: (request: DocumentUploadRequest) =>
    apiClient.post<ComplianceDocument>('/importers/documents', request),
  attachDocumentToTransaction: (documentId: string, transactionId: string) =>
    apiClient.post<ComplianceDocument>(`/importers/documents/${documentId}/attach`, {
      transactionId,
    }),
  getDocument: (documentId: string) =>
    apiClient.get<ComplianceDocument>(`/importers/documents/${documentId}`),
};
