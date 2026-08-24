import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { TransactionsStackParamList } from '@/navigation/types';
import { radii, spacing, typography, useTheme } from '@/theme';
import { mockTransactions } from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionsHome'>;

export function TransactionsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const completedCount = mockTransactions.filter((transaction) => transaction.status === 'completed').length;

  return (
    <Screen>
      <AppHeader
        title="Transactions"
        subtitle="Track payments, wallet transfers, references, and transaction status."
      />
      <View style={styles.summaryGrid}>
        <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.summaryValue, { color: colors.titleText }]}>{mockTransactions.length}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Total</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.summaryValue, { color: colors.titleText }]}>{completedCount}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Completed</Text>
        </View>
      </View>
      <InfoCard title="Recent transactions">
        {mockTransactions.length === 0 ? (
          <EmptyState
            title="No transactions"
            message="Payment, transfer, card operation, and document-linked transaction records will appear here."
          />
        ) : (
          mockTransactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              title={transaction.title}
              meta={`${transaction.reference} | ${transaction.type} | ${transaction.status}`}
              detail={transaction.amount.formatted}
              onPress={() =>
                navigation.navigate('TransactionDetails', {
                  transactionId: transaction.id,
                })
              }
            />
          ))
        )}
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.small,
  },
  summaryValue: {
    fontSize: typography.hMd,
    fontWeight: '700',
  },
});
