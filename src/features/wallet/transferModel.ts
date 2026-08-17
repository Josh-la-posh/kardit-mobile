import type {
  CurrencyCode,
  Money,
  WalletTransferDirection,
  WalletTransferFundingSource,
} from '@/types/wallet';

export type WalletTransferFormState = {
  amount: string;
  currency: CurrencyCode;
  destination?: WalletTransferFundingSource;
  direction: WalletTransferDirection;
  exchangeRate?: string;
  estimatedCharges?: Money;
  source?: WalletTransferFundingSource;
};

export type WalletTransferValidationResult = {
  message?: string;
  valid: boolean;
};

export type WalletTransferStatus =
  'not_started' | 'summary_ready' | 'submitted' | 'pending' | 'failed';

// TODO: Replace placeholder validation with Kardit Core transfer limits, fee rules, and balance checks.
export function validateTransferPlaceholder(
  formState: WalletTransferFormState,
): WalletTransferValidationResult {
  if (!formState.amount) {
    return { message: 'Amount is required before a transfer can be previewed.', valid: false };
  }

  if (!formState.source || !formState.destination) {
    return { message: 'Source and destination are required.', valid: false };
  }

  return { message: 'Placeholder validation passed. Backend rules are pending.', valid: true };
}

export function createMoneyPlaceholder(amount: string, currency: CurrencyCode): Money {
  return {
    amount,
    currency,
    formatted: `${currency} ${amount}`,
  };
}
