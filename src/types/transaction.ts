import type { ComplianceDocument } from './document';
import type { Money } from './wallet';

export type TransactionStatus = 'initiated' | 'processing' | 'pending' | 'completed' | 'failed';

export type TransactionType =
  'wallet_transfer' | 'qr_payment' | 'bank_account_payment' | 'card_operation';

export type TransactionFundingSourceType = 'wallet' | 'card';

export type ImporterTransaction = {
  id: string;
  reference: string;
  title: string;
  amount: Money;
  createdAt: string;
  fundingSourceType: TransactionFundingSourceType;
  status: TransactionStatus;
  type: TransactionType;
  documents?: ComplianceDocument[];
};

export type TransactionFilters = {
  dateFrom?: string;
  dateTo?: string;
  status?: TransactionStatus;
  type?: TransactionType;
};
