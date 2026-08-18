import type { CardType } from './importer';
import type { Supplier, SupplierBankAccount } from './supplier';
import type { TransactionStatus } from './transaction';
import type { Money } from './wallet';

export type PaymentRoute = 'unionpay_qr' | 'supplier_bank_account';

export type PaymentRouteOption = {
  description: string;
  label: string;
  route: PaymentRoute;
};

export type PaymentFundingSource = {
  id: string;
  label: string;
  type: 'wallet' | 'card';
  cardType?: CardType;
  availableBalance?: Money;
};

export type QrProcessingStatus = 'readable' | 'unreadable' | 'unsupported' | 'above_threshold';

export type QrProcessingResult = {
  invoiceDocumentId?: string;
  paymentAmount?: Money;
  qrReference: string;
  recommendedRoute?: PaymentRoute;
  status: QrProcessingStatus;
  supplier?: Supplier;
};

export type PaymentSummary = {
  amount: Money;
  documentsRequired: boolean;
  fundingSource: PaymentFundingSource;
  route: PaymentRoute;
  supplier: Supplier;
};

export type PaymentAuthenticationRequest = {
  challengeId: string;
  placeholderCode: string;
  transactionId: string;
};

export type QrPaymentRequest = {
  fundingSourceId: string;
  qrReference: string;
  saveSupplier?: boolean;
};

export type BankAccountPaymentRequest = {
  amount: Money;
  documentIds: string[];
  fundingSourceId: string;
  saveSupplier?: boolean;
  supplierBankAccount: SupplierBankAccount;
  supplierName: string;
};

export type PaymentResult = {
  reference: string;
  status: TransactionStatus;
  transactionId: string;
};
