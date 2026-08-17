import type { CardType } from './importer';
import type { TransactionStatus } from './transaction';

export type CurrencyCode = 'NGN' | 'CNY' | 'USD';

export type Money = {
  amount: string;
  currency: CurrencyCode;
  formatted: string;
};

export type WalletStatus = 'active' | 'pending_assignment' | 'restricted' | 'inactive';

export type ImporterWallet = {
  id: string;
  accountId: string;
  balance: Money;
  status: WalletStatus;
};

export type ExchangeRate = {
  fromCurrency: CurrencyCode;
  rate: string;
  toCurrency: CurrencyCode;
  updatedAt: string;
};

export type WalletTransferDirection = 'card_to_wallet' | 'wallet_to_card';

export type WalletTransferFundingSource = {
  id: string;
  label: string;
  type: 'wallet' | 'card';
  cardType?: CardType;
  availableBalance: Money;
};

export type WalletTransferSummary = {
  amount: Money;
  charges?: Money;
  destination: WalletTransferFundingSource;
  direction: WalletTransferDirection;
  exchangeRate?: ExchangeRate;
  source: WalletTransferFundingSource;
};

export type WalletTransferRequest = {
  amount: Money;
  cardId: string;
  direction: WalletTransferDirection;
};

export type WalletTransferResult = {
  reference: string;
  status: TransactionStatus;
};

export type WalletOverview = {
  exchangeRates: ExchangeRate[];
  recentTransfers: WalletTransferResult[];
  wallet: ImporterWallet;
};
