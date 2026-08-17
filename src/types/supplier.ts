import type { CurrencyCode } from './wallet';

export type SupplierPaymentMethod = 'qr' | 'bank_account';

export type SupplierBankAccount = {
  accountName: string;
  accountNumber: string;
  bankCode?: string;
  bankName: string;
  branchName?: string;
};

export type Supplier = {
  id: string;
  bankAccount?: SupplierBankAccount;
  createdAt: string;
  defaultCurrency?: CurrencyCode;
  displayName: string;
  paymentMethods: SupplierPaymentMethod[];
  qrReference?: string;
};

export type SupplierUpsertRequest = {
  bankAccount?: SupplierBankAccount;
  defaultCurrency?: CurrencyCode;
  displayName: string;
  paymentMethods: SupplierPaymentMethod[];
};
