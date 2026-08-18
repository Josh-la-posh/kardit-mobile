import {
  createMoneyPlaceholder,
  validateTransferPlaceholder,
  type WalletTransferFormState,
} from '@/features/wallet/transferModel';

const source = {
  id: 'card_001',
  availableBalance: createMoneyPlaceholder('1000', 'NGN'),
  label: 'Sample card',
  type: 'card' as const,
};

const destination = {
  id: 'wallet_001',
  availableBalance: createMoneyPlaceholder('5000', 'NGN'),
  label: 'Central wallet',
  type: 'wallet' as const,
};

const formState: WalletTransferFormState = {
  amount: '1000',
  currency: 'NGN',
  destination,
  direction: 'card_to_wallet',
  source,
};

describe('validateTransferPlaceholder', () => {
  it('rejects missing amount', () => {
    expect(validateTransferPlaceholder({ ...formState, amount: '' }).valid).toBe(false);
  });

  it('rejects missing source or destination', () => {
    expect(validateTransferPlaceholder({ ...formState, source: undefined }).valid).toBe(false);
    expect(validateTransferPlaceholder({ ...formState, destination: undefined }).valid).toBe(false);
  });

  it('accepts complete placeholder transfer state', () => {
    expect(validateTransferPlaceholder(formState)).toEqual({
      message: 'Placeholder validation passed. Backend rules are pending.',
      valid: true,
    });
  });
});
