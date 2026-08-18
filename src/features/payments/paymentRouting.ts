import type { PaymentRoute, QrProcessingResult } from '@/types/payment';

export type QrRouteDecision = {
  message: string;
  route: PaymentRoute;
};

export function getQrRouteDecisionPlaceholder(result: QrProcessingResult): QrRouteDecision {
  // TODO: Replace with Kardit Core QR readability, support, threshold, and routing decision API.
  if (result.status === 'readable') {
    return {
      message: 'QR is readable, supported, and within placeholder UnionPay threshold.',
      route: 'unionpay_qr',
    };
  }

  if (result.status === 'above_threshold') {
    return {
      message: 'Above-threshold QR payments must continue through supplier bank-account payment.',
      route: 'supplier_bank_account',
    };
  }

  return {
    message: 'Unreadable or unsupported QR payments route to supplier bank-account payment.',
    route: 'supplier_bank_account',
  };
}

export const providerChoiceHiddenNote =
  'The underlying provider is determined by Kardit Core and is not shown as a user choice.';
