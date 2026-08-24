import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StatusPill } from '@/components/ui/StatusPill';
import type { WalletStackParamList } from '@/navigation/types';
import { radii, spacing, typography, useTheme } from '@/theme';
import { mockTransactions, mockWallet, mockWalletOverview } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'WalletHome'>;

export function WalletScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const walletTransactions = mockTransactions.filter(
    (transaction) => transaction.type === 'wallet_transfer',
  );

  return (
    <Screen>
      <AppHeader
        title="Central wallet"
        subtitle="Manage wallet balance, transfers, and card funding movement."
      />
      <View style={[styles.walletHero, { backgroundColor: colors.accent }]}>
        <Text style={styles.heroLabel}>Available balance</Text>
        <Text style={styles.heroBalance}>{mockWallet.balance.formatted}</Text>
        <StatusPill label={mockWallet.status} tone="success" />
      </View>
      <InfoCard title="Wallet overview">
        <ListItem title="Wallet ID" detail={mockWallet.id} />
        <ListItem title="Currency" detail={mockWallet.balance.currency} />
        <ListItem title="Account status" detail={mockWallet.status} />
      </InfoCard>
      {mockWalletOverview.recentTransfers.length === 0 ? (
        <EmptyState
          title="No wallet transfers"
          message="Wallet transfer activity will appear here."
        />
      ) : (
        <InfoCard title="Recent transfers">
          {mockWalletOverview.recentTransfers.map((transfer) => (
            <ListItem
              key={transfer.reference}
              title={transfer.reference}
              meta="Wallet transfer"
              detail={transfer.status}
            />
          ))}
        </InfoCard>
      )}
      <InfoCard title="Wallet transactions">
        {walletTransactions.length === 0 ? (
          <EmptyState title="No wallet transactions" message="Completed wallet activity appears here." />
        ) : (
          walletTransactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              title={transaction.title}
              meta={transaction.reference}
              detail={transaction.amount.formatted}
            />
          ))
        )}
      </InfoCard>
      <View style={styles.actions}>
        <Button onPress={() => navigation.navigate('FundsTransfer')}>Funds transfer</Button>
        <Button variant="secondary" onPress={() => navigation.navigate('TransferDirection')}>
          Move between card and wallet
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
  },
  heroBalance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  heroLabel: {
    color: '#DDEFE4',
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  walletHero: {
    alignItems: 'flex-start',
    borderRadius: radii.xl,
    gap: spacing.md,
    padding: spacing.xl,
  },
});
