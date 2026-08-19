import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { TransactionsStackParamList } from '@/navigation/types';
import { mockTransactions } from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionsHome'>;

export function TransactionsScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Transactions"
        subtitle="Search, filters, linked documents, status timelines, and support CTAs are demo-backed."
      />
      <InfoCard title="Filters">
        <ListItem
          title="Search and filter"
          meta="Status, type, route, date, and reference filters are UI placeholders."
          detail="Demo"
        />
      </InfoCard>
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
    </Screen>
  );
}
