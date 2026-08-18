import type {
  BankAccountPaymentRequest,
  PaymentAuthenticationRequest,
  PaymentResult,
  PaymentRouteOption,
  PaymentSummary,
  QrPaymentRequest,
  QrProcessingResult,
} from '@/types/payment';

import { apiClient } from './client';

// TODO: Confirm payment-engine endpoints, authentication challenge flow, thresholds, and idempotency keys.
export const paymentsApi = {
  getPaymentRoutes: () => apiClient.get<PaymentRouteOption[]>('/importers/payments/routes'),
  parseQrPayload: (request: { imageUri?: string; qrPayload?: string }) =>
    apiClient.post<QrProcessingResult>('/importers/payments/qr/parse', request),
  processQrCode: (request: { imageUri?: string; qrPayload?: string }) =>
    apiClient.post<QrProcessingResult>('/importers/payments/qr/process', request),
  validateQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<{ valid: boolean; message?: string }>(
      '/importers/payments/qr/validate',
      request,
    ),
  validateBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<{ valid: boolean; message?: string }>(
      '/importers/payments/bank-account/validate',
      request,
    ),
  getPaymentSummary: (request: QrPaymentRequest | BankAccountPaymentRequest) =>
    apiClient.post<PaymentSummary>('/importers/payments/summary', request),
  previewQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<PaymentSummary>('/importers/payments/qr/preview', request),
  initiateQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/qr/initiate', request),
  submitQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/qr', request),
  previewBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<PaymentSummary>('/importers/payments/bank-account/preview', request),
  initiateBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/bank-account/initiate', request),
  submitBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/bank-account', request),
  confirmPaymentAuthentication: (request: PaymentAuthenticationRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/authentication/confirm', request),
  getPaymentStatus: (transactionId: string) =>
    apiClient.get<PaymentResult>(`/importers/payments/${transactionId}`),
};
