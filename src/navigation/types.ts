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

export type PaymentsStackParamList = {
  PaymentsHome: undefined;
  QrPayment: undefined;
  BankAccountPayment: undefined;
};

export type TransactionsStackParamList = {
  TransactionsHome: undefined;
  TransactionDetails: { transactionId: string };
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
  Suppliers: undefined;
  Payments: NavigatorScreenParams<PaymentsStackParamList>;
  Transactions: NavigatorScreenParams<TransactionsStackParamList>;
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
