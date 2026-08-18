import type { ComplianceDocument } from '@/types/document';
import type {
  ImporterTransaction,
  TransactionFilters,
  TransactionStatus,
  TransactionTimelineItem,
} from '@/types/transaction';

import { apiClient } from './client';

// TODO: Replace placeholder transaction path and response shape with confirmed backend contracts.
export const transactionsApi = {
  getTransactions: () => apiClient.get<ImporterTransaction[]>('/importers/transactions'),
  listTransactions: () =>
    apiClient.get<Array<{ id: string; description: string; amount: string; date: string }>>(
      '/importers/transactions',
    ),
  getTransactionDetails: (transactionId: string) =>
    apiClient.get<ImporterTransaction>(`/importers/transactions/${transactionId}`),
  getTransactionDocuments: (transactionId: string) =>
    apiClient.get<ComplianceDocument[]>(`/importers/transactions/${transactionId}/documents`),
  getTransactionTimeline: (transactionId: string) =>
    apiClient.get<TransactionTimelineItem[]>(`/importers/transactions/${transactionId}/timeline`),
  filterTransactions: (filters: TransactionFilters) =>
    apiClient.post<ImporterTransaction[]>('/importers/transactions/filter', filters),
  getTransactionStatus: (transactionId: string) =>
    apiClient.get<{ status: TransactionStatus }>(`/importers/transactions/${transactionId}/status`),
};
