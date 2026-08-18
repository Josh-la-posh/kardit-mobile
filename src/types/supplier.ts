import type { CurrencyCode } from './wallet';

export type SupplierPaymentMethod = 'qr' | 'bank_account';
export type SupplierValidationStatus = 'unverified' | 'pending' | 'verified' | 'failed';

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
  contactEmail?: string;
  contactPhone?: string;
  country: string;
  createdAt: string;
  defaultCurrency?: CurrencyCode;
  displayName: string;
  paymentMethods: SupplierPaymentMethod[];
  qrReference?: string;
  reusable: boolean;
  validationStatus: SupplierValidationStatus;
};

export type SupplierUpsertRequest = {
  bankAccount?: SupplierBankAccount;
  contactEmail?: string;
  contactPhone?: string;
  country: string;
  defaultCurrency?: CurrencyCode;
  displayName: string;
  paymentMethods: SupplierPaymentMethod[];
  reusable?: boolean;
};
