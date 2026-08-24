import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StatusPill } from '@/components/ui/StatusPill';
import { Timeline } from '@/components/ui/Timeline';
import type { TransactionsStackParamList } from '@/navigation/types';
import { radii, spacing, typography, useTheme } from '@/theme';
import {
  mockComplianceDocuments,
  mockTransactions,
  mockTransactionTimeline,
} from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionDetails'>;

export function TransactionDetailsScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const transaction =
    mockTransactions.find((item) => item.id === route.params.transactionId) ?? mockTransactions[0];
  const documents = mockComplianceDocuments.filter(
    (document) => document.transactionId === transaction.id,
  );
  const timeline = mockTransactionTimeline[transaction.id] ?? [];

  return (
    <Screen>
      <AppHeader
        title="Transaction details"
        subtitle="Reference, route, linked documents, timeline, and support actions."
      />
      <View style={[styles.hero, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <Text style={[styles.heroLabel, { color: colors.textMuted }]}>{transaction.reference}</Text>
        <Text style={[styles.heroAmount, { color: colors.titleText }]}>
          {transaction.amount.formatted}
        </Text>
        <StatusPill
          label={transaction.status}
          tone={transaction.status === 'failed' ? 'danger' : transaction.status === 'completed' ? 'success' : 'warning'}
        />
      </View>
      <InfoCard title={transaction.title}>
        <ListItem title="Reference" detail={transaction.reference} />
        <ListItem title="Amount" detail={transaction.amount.formatted} />
        <ListItem title="Type" detail={transaction.type} />
        <ListItem title="Route" detail={transaction.paymentRoute ?? 'Not applicable'} />
        <ListItem
          title="Funding source"
          detail={transaction.fundingSourceLabel ?? transaction.fundingSourceType}
        />
        <ListItem title="Related record" detail={transaction.relatedRecordLabel ?? 'Not linked'} />
      </InfoCard>
      <InfoCard title="Linked documents">
        {documents.length === 0 ? (
          <EmptyState
            title="No linked documents"
            message="Supporting documents will appear here after document contracts are confirmed."
          />
        ) : (
          documents.map((document) => (
            <ListItem
              key={document.id}
              title={document.fileName}
              meta={document.type}
              detail={document.status}
            />
          ))
        )}
      </InfoCard>
      <InfoCard title="Status timeline">
        <Timeline
          items={timeline.map((item) => ({
            id: item.id,
            label: item.label,
            meta: `${item.status} | ${item.occurredAt}`,
          }))}
        />
      </InfoCard>
      <Button variant="secondary">Retry demo action</Button>
      <Button
        variant="ghost"
        onPress={() => navigation.getParent()?.navigate('Cases', { screen: 'CaseType' })}
      >
        Create support case
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'flex-start',
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  heroAmount: {
    fontSize: 30,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  heroLabel: {
    fontSize: typography.small,
    fontWeight: '600',
  },
});
