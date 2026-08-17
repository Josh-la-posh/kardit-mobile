import type {
  ExchangeRate,
  ImporterWallet,
  WalletOverview,
  WalletTransferRequest,
  WalletTransferResult,
  WalletTransferSummary,
} from '@/types/wallet';

import { apiClient } from './client';

// TODO: Confirm Kardit Core wallet endpoint paths, transfer validation payloads, and idempotency rules.
export const walletApi = {
  getWalletOverview: () => apiClient.get<WalletOverview>('/importers/wallet/overview'),
  getWallet: () => apiClient.get<ImporterWallet>('/importers/wallet'),
  getWalletBalance: () => apiClient.get<ImporterWallet['balance']>('/importers/wallet/balance'),
  getExchangeRates: () => apiClient.get<ExchangeRate[]>('/importers/wallet/exchange-rates'),
  validateTransfer: (request: WalletTransferRequest) =>
    apiClient.post<{ valid: boolean; message?: string }>(
      '/importers/wallet/transfers/validate',
      request,
    ),
  getTransferSummary: (request: WalletTransferRequest) =>
    apiClient.post<WalletTransferSummary>('/importers/wallet/transfers/summary', request),
  previewTransfer: (request: WalletTransferRequest) =>
    apiClient.post<WalletTransferSummary>('/importers/wallet/transfers/preview', request),
  submitTransfer: (request: WalletTransferRequest) =>
    apiClient.post<WalletTransferResult>('/importers/wallet/transfers', request),
  getTransferStatus: (reference: string) =>
    apiClient.get<WalletTransferResult>(`/importers/wallet/transfers/${reference}`),
};
