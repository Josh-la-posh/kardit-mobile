import type { ImporterCard, IssuingBank } from '@/types/importer';

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
