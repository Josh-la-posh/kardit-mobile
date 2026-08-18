import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  ImporterType: undefined;
  ApplicantInformation: undefined;
  DocumentSubmission: undefined;
  BusinessProfile: undefined;
  ReviewDeclaration: undefined;
  ApplicationStatus: undefined;
  AdditionalInformationRequired: undefined;
};

export type CardsStackParamList = {
  CardsList: undefined;
  CardDetails: { cardId: string };
  CreateCard: undefined;
  SelectIssuingBank: undefined;
  SelectCardType: undefined;
  CardRequestDetails: undefined;
  ReviewCardRequest: undefined;
  CardRequestResult: undefined;
  FundCard: { cardId?: string };
};

export type WalletStackParamList = {
  WalletHome: undefined;
  FundsTransfer: undefined;
  TransferDirection: undefined;
  CardToWalletTransfer: undefined;
  WalletToCardTransfer: undefined;
  TransferSummary: undefined;
  TransferResult: undefined;
};

export type SuppliersStackParamList = {
  SuppliersHome: undefined;
  SupplierDetails: { supplierId: string };
  CreateSupplier: undefined;
  EditSupplier: { supplierId: string };
  SupplierValidation: { supplierId?: string };
};

export type PaymentsStackParamList = {
  PaymentsHome: undefined;
  QrPayment: undefined;
  QrScanUpload: undefined;
  BankAccountPayment: undefined;
  PaymentDetails: undefined;
  FundingSourceSelection: undefined;
  PaymentSummary: undefined;
  PaymentAuthentication: undefined;
  PaymentResult: undefined;
};

export type TransactionsStackParamList = {
  TransactionsHome: undefined;
  TransactionDetails: { transactionId: string };
};

export type DocumentsStackParamList = {
  DocumentsHome: undefined;
  DocumentDetails: { documentId: string };
  UploadDocument: { transactionId?: string };
  DocumentLink: { documentId?: string; transactionId?: string };
  DocumentStatus: { documentId?: string };
};

export type CasesStackParamList = {
  CasesHome: undefined;
  CreateCase: undefined;
  CaseDetails: { caseId: string };
};

export type AccountStackParamList = {
  AccountHome: undefined;
  AccountDetails: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Wallet: NavigatorScreenParams<WalletStackParamList>;
  Cards: NavigatorScreenParams<CardsStackParamList>;
  Suppliers: NavigatorScreenParams<SuppliersStackParamList>;
  Payments: NavigatorScreenParams<PaymentsStackParamList>;
  Transactions: NavigatorScreenParams<TransactionsStackParamList>;
  Documents: NavigatorScreenParams<DocumentsStackParamList>;
  Cases: NavigatorScreenParams<CasesStackParamList>;
  Account: NavigatorScreenParams<AccountStackParamList>;
  Profile: undefined;
  Support: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  ApplicationStatus: undefined;
  AdditionalInformationRequired: undefined;
  AccountProvisioningPending: undefined;
  WalletAssignmentPending: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};
