import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/layout/Screen';
import { BalanceCard } from '@/components/ui/BalanceCard';
import { CardPreview } from '@/components/ui/CardPreview';
import { ListItem } from '@/components/ui/ListItem';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { MainTabParamList } from '@/navigation/types';
import { spacing, typography, useTheme } from '@/theme';
import { mockCards, mockExchangeRates, mockTransactions, mockWallet } from '@/utils/mockData';

type Props = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.ink }]}>Good morning, Joshua</Text>
          <Text style={[styles.caption, { color: colors.muted }]}>Sample Importer Ltd.</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.line }]}
          >
            <Ionicons color={colors.ink} name="notifications-outline" size={20} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Account', { screen: 'AccountDetails' })}
            style={[styles.avatar, { backgroundColor: colors.forest }]}
          >
            <Text style={styles.avatarText}>JI</Text>
          </Pressable>
        </View>
      </View>

      <BalanceCard
        balance={mockWallet.balance.formatted}
        onAddMoney={() => navigation.navigate('Wallet', { screen: 'TransferDirection' })}
        onPaySupplier={() => navigation.navigate('Payments', { screen: 'PaymentsHome' })}
      />

      <View style={styles.section}>
        <SectionHeader
          action="View all"
          onActionPress={() => navigation.navigate('Cards', { screen: 'CardsList' })}
          title="Cards"
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardStrip}>
            {mockCards.map((card) => (
              <CardPreview key={card.id} card={card} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Rates" />
        {mockExchangeRates.map((rate) => (
          <ListItem
            key={`${rate.fromCurrency}-${rate.toCurrency}`}
            title={`${rate.fromCurrency} to ${rate.toCurrency}`}
            meta="Indicative"
            detail={rate.rate}
          />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader
          action="View all"
          onActionPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHome' })}
          title="Recent activity"
        />
        {mockTransactions.slice(0, 5).map((transaction) => (
          <ListItem
            key={transaction.id}
            title={transaction.title}
            meta={transaction.status}
            detail={transaction.amount.formatted}
            onPress={() =>
              navigation.navigate('Transactions', {
                screen: 'TransactionDetails',
                params: { transactionId: transaction.id },
              })
            }
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: typography.small,
    fontWeight: '700',
  },
  caption: {
    fontSize: typography.small,
  },
  cardStrip: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  greeting: {
    fontSize: typography.hMd,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  section: {
    gap: spacing.md,
  },
});
