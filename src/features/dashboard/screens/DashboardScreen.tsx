import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { ActionTile } from '@/components/ui/ActionTile';
import { AppHeader } from '@/components/ui/AppHeader';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { MoneyText } from '@/components/ui/MoneyText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatCard } from '@/components/ui/StatCard';
import { StatusPill } from '@/components/ui/StatusPill';
import type { MainTabParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';
import { mockCards, mockExchangeRates, mockTransactions, mockWallet } from '@/utils/mockData';

type Props = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        eyebrow="Kardit importer"
        title="Business command center"
        subtitle="Demo data only. Backend contracts are pending, so no real money, card, or supplier payment action is performed."
      />

      <InfoCard title="Central wallet">
        <View style={styles.cardHeader}>
          <MoneyText>{mockWallet.balance.formatted}</MoneyText>
          <StatusPill label={mockWallet.status} tone="success" />
        </View>
        <Text style={styles.muted}>
          Assigned central wallet for importer funding and settlement demos.
        </Text>
      </InfoCard>

      <View style={styles.stats}>
        <StatCard label="UnionPay cards" value={`${mockCards.length}`} meta="Linked demo cards" />
        <StatCard label="Pending items" value="3" meta="Payments, docs, cases" />
      </View>

      <InfoCard title="Compliance alerts">
        <ListItem
          title="Document rule source"
          meta="Core will decide final regulatory requirements. Current screens use demo requirements."
          detail="Pending"
        />
        <ListItem
          title="Payment authentication"
          meta="OTP, PIN, biometric, or challenge flow is not wired yet."
          detail="Demo"
        />
      </InfoCard>

      <View style={styles.section}>
        <SectionHeader title="Quick actions" />
        <View style={styles.actions}>
          <ActionTile
            icon="wallet-outline"
            label="Fund wallet/card"
            onPress={() => navigation.navigate('Wallet', { screen: 'TransferDirection' })}
          />
          <ActionTile
            icon="swap-horizontal-outline"
            label="Wallet to card"
            onPress={() => navigation.navigate('Wallet', { screen: 'WalletToCardTransfer' })}
          />
          <ActionTile
            icon="card-outline"
            label="Card to wallet"
            onPress={() => navigation.navigate('Wallet', { screen: 'CardToWalletTransfer' })}
          />
          <ActionTile
            icon="business-outline"
            label="Pay supplier"
            onPress={() => navigation.navigate('Payments', { screen: 'BankAccountPayment' })}
          />
          <ActionTile
            icon="qr-code-outline"
            label="Scan/upload QR"
            onPress={() => navigation.navigate('Payments', { screen: 'QrPayment' })}
          />
          <ActionTile
            icon="receipt-outline"
            label="Transactions"
            onPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHome' })}
          />
        </View>
      </View>

      <InfoCard title="UnionPay card summary">
        {mockCards.map((card) => (
          <ListItem
            key={card.id}
            title={card.label}
            meta={`${card.bankName} | ${card.maskedNumber ?? 'Masked PAN pending'}`}
            detail={card.balance}
            onPress={() =>
              navigation.navigate('Cards', {
                screen: 'CardDetails',
                params: { cardId: card.id },
              })
            }
          />
        ))}
      </InfoCard>

      <InfoCard title="Exchange rates">
        {mockExchangeRates.map((rate) => (
          <ListItem
            key={`${rate.fromCurrency}-${rate.toCurrency}`}
            title={`${rate.fromCurrency} to ${rate.toCurrency}`}
            meta="Indicative demo rate. Backend quote expiry pending."
            detail={rate.rate}
          />
        ))}
      </InfoCard>

      <InfoCard title="Recent transactions">
        {mockTransactions.slice(0, 3).map((transaction) => (
          <ListItem
            key={transaction.id}
            title={transaction.title}
            meta={`${transaction.reference} | ${transaction.status}`}
            detail={transaction.amount.formatted}
            onPress={() =>
              navigation.navigate('Transactions', {
                screen: 'TransactionDetails',
                params: { transactionId: transaction.id },
              })
            }
          />
        ))}
      </InfoCard>

      <InfoCard title="More demo areas">
        <View style={styles.actions}>
          <ActionTile
            icon="people-outline"
            label="Suppliers"
            onPress={() => navigation.navigate('Suppliers', { screen: 'SuppliersHome' })}
          />
          <ActionTile
            icon="document-text-outline"
            label="Documents"
            onPress={() => navigation.navigate('Documents', { screen: 'DocumentsHome' })}
          />
          <ActionTile
            icon="add-circle-outline"
            label="Request card"
            onPress={() => navigation.navigate('Cards', { screen: 'SelectIssuingBank' })}
          />
          <ActionTile
            icon="chatbox-ellipses-outline"
            label="Support cases"
            onPress={() => navigation.navigate('Cases', { screen: 'CasesHome' })}
          />
        </View>
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cardHeader: {
    gap: spacing.sm,
  },
  muted: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 19,
  },
  section: {
    gap: spacing.md,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
