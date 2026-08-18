import type { ImporterAccount } from '@/types/account';
import type { SupportCase } from '@/types/case';
import type {
  CardRequestResult,
  CardTransaction,
  ImporterCard,
  IssuingBank,
  VirtualCardSensitiveDetails,
} from '@/types/importer';
import type {
  PaymentFundingSource,
  PaymentResult,
  PaymentRouteOption,
  PaymentSummary,
  QrProcessingResult,
} from '@/types/payment';
import type { Supplier } from '@/types/supplier';
import type { ImporterTransaction } from '@/types/transaction';
import type {
  ExchangeRate,
  ImporterWallet,
  WalletOverview,
  WalletTransferFundingSource,
  WalletTransferSummary,
} from '@/types/wallet';

export const mockCards: ImporterCard[] = [
  {
    id: 'card_001',
    label: 'Procurement virtual card',
    type: 'virtual',
    bankName: 'Sample Issuing Bank',
    status: 'active',
    balance: 'NGN 250,000',
    maskedNumber: '**** **** **** 4821',
  },
  {
    id: 'card_002',
    label: 'Supplier payments physical card',
    type: 'physical',
    bankName: 'Trade Finance Bank',
    status: 'active',
    balance: 'NGN 120,000',
    maskedNumber: '**** **** **** 1190',
  },
];

export const mockIssuingBanks: IssuingBank[] = [
  { id: 'bank_001', name: 'Sample Issuing Bank', supportedCardTypes: ['virtual', 'physical'] },
  { id: 'bank_002', name: 'Trade Finance Bank', supportedCardTypes: ['virtual'] },
];

export const mockCardTransactions: Record<string, CardTransaction[]> = {
  card_001: [
    {
      id: 'card_txn_001',
      amount: 'NGN 45,000',
      createdAt: '2026-08-17T00:00:00.000Z',
      description: 'Sample card funding',
      status: 'completed',
    },
    {
      id: 'card_txn_002',
      amount: 'CNY 1,000',
      createdAt: '2026-08-16T00:00:00.000Z',
      description: 'Sample supplier spend',
      status: 'pending',
    },
  ],
  card_002: [],
};

export const mockVirtualCardSensitiveDetails: VirtualCardSensitiveDetails = {
  cvvPlaceholder: '***',
  expiryPlaceholder: '**/**',
  panPlaceholder: '**** **** **** ****',
};

export const mockCardRequestResult: CardRequestResult = {
  reference: 'KDT-CARD-REQ-001',
  status: 'submitted',
};

export const mockWallet: ImporterWallet = {
  id: 'wallet_001',
  accountId: 'account_001',
  balance: { amount: '850000', currency: 'NGN', formatted: 'NGN 850,000' },
  status: 'active',
};

export const mockExchangeRates: ExchangeRate[] = [
  {
    fromCurrency: 'NGN',
    rate: '0.0048',
    toCurrency: 'CNY',
    updatedAt: '2026-08-17T00:00:00.000Z',
  },
  {
    fromCurrency: 'USD',
    rate: '7.18',
    toCurrency: 'CNY',
    updatedAt: '2026-08-17T00:00:00.000Z',
  },
];

export const mockWalletFundingSource: WalletTransferFundingSource = {
  id: mockWallet.id,
  label: 'Central wallet',
  type: 'wallet',
  availableBalance: mockWallet.balance,
};

export const mockCardFundingSources: WalletTransferFundingSource[] = mockCards.map((card) => ({
  id: card.id,
  label: card.label,
  type: 'card',
  cardType: card.type,
  availableBalance: {
    amount: card.id === 'card_001' ? '250000' : '120000',
    currency: 'NGN',
    formatted: card.balance,
  },
}));

export const mockTransferSummary: WalletTransferSummary = {
  amount: { amount: '100000', currency: 'NGN', formatted: 'NGN 100,000' },
  charges: { amount: '0', currency: 'NGN', formatted: 'NGN 0 placeholder fee' },
  destination: mockWalletFundingSource,
  direction: 'card_to_wallet',
  exchangeRate: mockExchangeRates[0],
  source: mockCardFundingSources[0],
};

export const mockSuppliers: Supplier[] = [
  {
    id: 'supplier_001',
    bankAccount: {
      accountName: 'Yiwu Trading Co.',
      accountNumber: '0000000000',
      bankName: 'Sample China Bank',
    },
    contactEmail: 'accounts@yiwutrading.example',
    contactPhone: '+86 000 0000 0000',
    country: 'China',
    createdAt: '2026-08-17T00:00:00.000Z',
    defaultCurrency: 'CNY',
    displayName: 'Yiwu Trading Co.',
    paymentMethods: ['bank_account', 'qr'],
    reusable: true,
    validationStatus: 'verified',
  },
  {
    id: 'supplier_002',
    bankAccount: {
      accountName: 'Guangzhou Parts Market',
      accountNumber: '1111111111',
      bankName: 'Sample Merchant Bank',
    },
    contactEmail: 'sales@gzparts.example',
    country: 'China',
    createdAt: '2026-08-16T00:00:00.000Z',
    defaultCurrency: 'CNY',
    displayName: 'Guangzhou Parts Market',
    paymentMethods: ['bank_account'],
    reusable: true,
    validationStatus: 'pending',
  },
];

export const mockPaymentRoutes: PaymentRouteOption[] = [
  {
    description: 'Supported, readable QR payments within placeholder threshold.',
    label: 'QR payment',
    route: 'unionpay_qr',
  },
  {
    description: 'Supplier bank-account payment for unsupported QR or bank details.',
    label: 'Supplier bank account',
    route: 'supplier_bank_account',
  },
];

export const mockPaymentFundingSources: PaymentFundingSource[] = [
  mockWalletFundingSource,
  ...mockCardFundingSources,
];

export const mockQrProcessingResult: QrProcessingResult = {
  invoiceDocumentId: 'doc_invoice_placeholder',
  paymentAmount: { amount: '1000', currency: 'CNY', formatted: 'CNY 1,000' },
  qrReference: 'QR-PLACEHOLDER-001',
  recommendedRoute: 'unionpay_qr',
  status: 'readable',
  supplier: mockSuppliers[0],
};

export const mockPaymentSummary: PaymentSummary = {
  amount: { amount: '1000', currency: 'CNY', formatted: 'CNY 1,000' },
  documentsRequired: false,
  fundingSource: mockCardFundingSources[0],
  route: 'unionpay_qr',
  supplier: mockSuppliers[0],
};

export const mockPaymentResult: PaymentResult = {
  reference: 'KDT-PAY-001',
  status: 'pending',
  transactionId: 'txn_001',
};

export const mockTransactions: ImporterTransaction[] = [
  {
    id: 'txn_001',
    reference: 'KDT-TXN-001',
    title: 'Sample supplier payment',
    amount: { amount: '1000', currency: 'CNY', formatted: 'CNY 1,000' },
    createdAt: '2026-08-17T00:00:00.000Z',
    fundingSourceType: 'card',
    status: 'pending',
    type: 'qr_payment',
  },
  {
    id: 'txn_002',
    reference: 'KDT-TXN-002',
    title: 'Card to wallet transfer',
    amount: { amount: '100000', currency: 'NGN', formatted: 'NGN 100,000' },
    createdAt: '2026-08-16T00:00:00.000Z',
    fundingSourceType: 'card',
    status: 'completed',
    type: 'wallet_transfer',
  },
];

export const mockWalletOverview: WalletOverview = {
  exchangeRates: mockExchangeRates,
  recentTransfers: [{ reference: 'KDT-TRF-001', status: 'pending' }],
  wallet: mockWallet,
};

export const mockCases: SupportCase[] = [
  {
    id: 'case_001',
    accountId: 'account_001',
    createdAt: '2026-08-17T00:00:00.000Z',
    description: 'Sample placeholder case awaiting backend contract confirmation.',
    reference: 'KDT-CS-001',
    status: 'open',
    title: 'Sample payment support case',
    type: 'payment_issue',
    updates: [],
  },
];

export const mockAccount: ImporterAccount = {
  id: 'account_001',
  profile: {
    accountId: 'account_001',
    businessName: 'Sample Importer Ltd.',
    email: 'importer@example.com',
    fullName: 'Sample Importer',
    role: 'importer',
  },
  provisioningStatus: 'ready',
  wallet: mockWallet,
};
