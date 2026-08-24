import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/layout/Screen';
import { BalanceCard } from '@/components/ui/BalanceCard';
import { Button } from '@/components/ui/Button';
import { CardPreview } from '@/components/ui/CardPreview';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { MainTabParamList } from '@/navigation/types';
import { radii, spacing, typography, useTheme } from '@/theme';
import { mockCards, mockTransactions, mockWallet } from '@/utils/mockData';

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
            onPress={() => navigation.navigate('Account', { screen: 'AccountHome' })}
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
              <CardPreview
                key={card.id}
                card={card}
                onPress={() => navigation.navigate('Cards', { screen: 'CardDetails', params: { cardId: card.id } })}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.cardButtons}>
          <Button onPress={() => navigation.navigate('Cards', { screen: 'CreateCard' })}>
            Issue card
          </Button>
          <Button
            variant="secondary"
            onPress={() => navigation.navigate('Cards', { screen: 'CardsList' })}
          >
            All card
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          action="View more"
          onActionPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHome' })}
          title="Latest transactions"
        />
        {mockTransactions.slice(0, 5).map((transaction) => (
          <Pressable
            accessibilityRole="button"
            key={transaction.id}
            onPress={() =>
              navigation.navigate('Transactions', {
                screen: 'TransactionDetails',
                params: { transactionId: transaction.id },
              })
            }
            style={({ pressed }) => [
              styles.transactionRow,
              { backgroundColor: colors.card, borderColor: colors.line },
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, { backgroundColor: colors.primaryMuted }]}>
                <Ionicons color={colors.primary} name="swap-horizontal-outline" size={18} />
              </View>
              <View style={styles.transactionText}>
                <Text style={[styles.transactionTitle, { color: colors.ink }]}>
                  {transaction.title}
                </Text>
                <Text style={[styles.transactionMeta, { color: colors.muted }]}>
                  {transaction.relatedRecordLabel ?? transaction.fundingSourceLabel}
                </Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text style={[styles.transactionAmount, { color: colors.ink }]}>
                {transaction.amount.formatted}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      transaction.status === 'completed'
                        ? colors.forestTint
                        : transaction.status === 'failed'
                          ? colors.scarletTint
                          : colors.amberTint,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        transaction.status === 'completed'
                          ? colors.success
                          : transaction.status === 'failed'
                            ? colors.danger
                            : colors.warning,
                    },
                  ]}
                >
                  {transaction.status}
                </Text>
              </View>
            </View>
          </Pressable>
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
  cardButtons: {
    gap: spacing.md,
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
  pressed: {
    opacity: 0.88,
  },
  statusBadge: {
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: typography.eyebrow,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  transactionAmount: {
    fontSize: typography.body,
    fontWeight: '800',
  },
  transactionIcon: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  transactionLeft: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },
  transactionMeta: {
    fontSize: typography.small,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  transactionRow: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  transactionText: {
    flex: 1,
    gap: spacing.xs,
  },
  transactionTitle: {
    fontSize: typography.body,
    fontWeight: '700',
  },
});
