import type {
  BankAccountPaymentRequest,
  PaymentResult,
  PaymentSummary,
  QrPaymentRequest,
  QrProcessingResult,
} from '@/types/payment';

import { apiClient } from './client';

// TODO: Confirm payment-engine endpoints, authentication challenge flow, thresholds, and idempotency keys.
export const paymentsApi = {
  processQrCode: (request: { imageUri?: string; qrPayload?: string }) =>
    apiClient.post<QrProcessingResult>('/importers/payments/qr/process', request),
  previewQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<PaymentSummary>('/importers/payments/qr/preview', request),
  submitQrPayment: (request: QrPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/qr', request),
  previewBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<PaymentSummary>('/importers/payments/bank-account/preview', request),
  submitBankAccountPayment: (request: BankAccountPaymentRequest) =>
    apiClient.post<PaymentResult>('/importers/payments/bank-account', request),
  getPaymentStatus: (transactionId: string) =>
    apiClient.get<PaymentResult>(`/importers/payments/${transactionId}`),
};
