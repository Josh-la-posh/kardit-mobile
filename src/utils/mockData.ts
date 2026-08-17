import type { ImporterAccount } from '@/types/account';
import type { SupportCase } from '@/types/case';
import type { ImporterCard, IssuingBank } from '@/types/importer';
import type { Supplier } from '@/types/supplier';
import type { ImporterTransaction } from '@/types/transaction';
import type { ImporterWallet } from '@/types/wallet';

export const mockCards: ImporterCard[] = [
  {
    id: 'card_001',
    label: 'Procurement virtual card',
    type: 'virtual',
    bankName: 'Sample Issuing Bank',
    status: 'active',
    balance: 'NGN 250,000',
  },
];

export const mockIssuingBanks: IssuingBank[] = [
  { id: 'bank_001', name: 'Sample Issuing Bank', supportedCardTypes: ['virtual', 'physical'] },
  { id: 'bank_002', name: 'Trade Finance Bank', supportedCardTypes: ['virtual'] },
];

export const mockWallet: ImporterWallet = {
  id: 'wallet_001',
  accountId: 'account_001',
  balance: { amount: '250000', currency: 'NGN', formatted: 'NGN 250,000' },
  status: 'active',
};

export const mockSuppliers: Supplier[] = [
  {
    id: 'supplier_001',
    bankAccount: {
      accountName: 'Yiwu Trading Co.',
      accountNumber: '0000000000',
      bankName: 'Sample China Bank',
    },
    createdAt: '2026-08-17T00:00:00.000Z',
    defaultCurrency: 'CNY',
    displayName: 'Yiwu Trading Co.',
    paymentMethods: ['bank_account', 'qr'],
  },
];

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
];

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
