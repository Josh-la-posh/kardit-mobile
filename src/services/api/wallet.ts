import type {
  ImporterWallet,
  WalletTransferRequest,
  WalletTransferResult,
  WalletTransferSummary,
} from '@/types/wallet';

import { apiClient } from './client';

// TODO: Confirm Kardit Core wallet endpoint paths, transfer validation payloads, and idempotency rules.
export const walletApi = {
  getWallet: () => apiClient.get<ImporterWallet>('/importers/wallet'),
  previewTransfer: (request: WalletTransferRequest) =>
    apiClient.post<WalletTransferSummary>('/importers/wallet/transfers/preview', request),
  submitTransfer: (request: WalletTransferRequest) =>
    apiClient.post<WalletTransferResult>('/importers/wallet/transfers', request),
  getTransferStatus: (reference: string) =>
    apiClient.get<WalletTransferResult>(`/importers/wallet/transfers/${reference}`),
};
