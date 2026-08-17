import { apiClient } from './client';

// TODO: Replace placeholder transaction path and response shape with confirmed backend contracts.
export const transactionsApi = {
  listTransactions: () =>
    apiClient.get<Array<{ id: string; description: string; amount: string; date: string }>>(
      '/importers/transactions',
    ),
};
