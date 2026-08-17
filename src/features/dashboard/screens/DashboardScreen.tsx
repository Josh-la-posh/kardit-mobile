import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { MainTabParamList } from '@/navigation/types';
import { mockCards, mockExchangeRates, mockTransactions, mockWallet } from '@/utils/mockData';

type Props = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Central wallet">
        <Text>{mockWallet.balance.formatted}</Text>
        <Text>Status: {mockWallet.status}</Text>
      </InfoCard>

      <InfoCard title="UnionPay cards">
        <Text>{mockCards.length} linked placeholder cards</Text>
        {mockCards.map((card) => (
          <Text key={card.id}>
            {card.label}: {card.balance}
          </Text>
        ))}
      </InfoCard>

      <InfoCard title="Exchange rates">
        {mockExchangeRates.map((rate) => (
          <Text key={`${rate.fromCurrency}-${rate.toCurrency}`}>
            {rate.fromCurrency} to {rate.toCurrency}: {rate.rate}
          </Text>
        ))}
      </InfoCard>

      <InfoCard title="Recent transactions">
        {mockTransactions.length === 0 ? (
          <EmptyState
            title="No recent transactions"
            message="Recent wallet, card, and payment transactions will appear here."
          />
        ) : (
          mockTransactions.slice(0, 3).map((transaction) => (
            <Text key={transaction.id}>
              {transaction.title}: {transaction.amount.formatted} ({transaction.status})
            </Text>
          ))
        )}
      </InfoCard>

      <InfoCard title="Quick actions">
        <Button
          onPress={() =>
            navigation.navigate('Wallet', {
              screen: 'TransferDirection',
            })
          }
        >
          Fund wallet/card
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate('Wallet', {
              screen: 'WalletToCardTransfer',
            })
          }
        >
          Transfer wallet to card
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate('Wallet', {
              screen: 'CardToWalletTransfer',
            })
          }
        >
          Transfer card to wallet
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate('Payments', {
              screen: 'BankAccountPayment',
            })
          }
        >
          Pay supplier
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate('Payments', {
              screen: 'QrPayment',
            })
          }
        >
          Scan/upload QR
        </Button>
        <Button
          variant="ghost"
          onPress={() =>
            navigation.navigate('Transactions', {
              screen: 'TransactionsHome',
            })
          }
        >
          View transactions
        </Button>
      </InfoCard>
    </Screen>
  );
}
