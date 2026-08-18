import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { TransactionsStackParamList } from '@/navigation/types';
import { mockTransactions } from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionsHome'>;

export function TransactionsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Transactions">
        <Text>Search and filter placeholders for status, type, route, and date.</Text>
      </InfoCard>
      {mockTransactions.length === 0 ? (
        <EmptyState
          title="No transactions"
          message="Payment, transfer, card operation, and document-linked transaction records will appear here."
        />
      ) : (
        mockTransactions.map((transaction) => (
          <InfoCard key={transaction.id} title={transaction.title}>
            <Text>Reference: {transaction.reference}</Text>
            <Text>Amount: {transaction.amount.formatted}</Text>
            <Text>Status: {transaction.status}</Text>
            <Text>Type: {transaction.type}</Text>
            <Button
              variant="secondary"
              onPress={() =>
                navigation.navigate('TransactionDetails', {
                  transactionId: transaction.id,
                })
              }
            >
              View details
            </Button>
          </InfoCard>
        ))
      )}
    </Screen>
  );
}
