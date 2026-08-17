import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import type { TransactionsStackParamList } from '@/navigation/types';
import { mockTransactions } from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionsHome'>;

export function TransactionsScreen({ navigation }: Props) {
  return (
    <Screen>
      <EmptyState
        title="No transactions"
        message="Payment, transfer, card operation, and document-linked transaction records will appear here."
      />
      {mockTransactions.length > 0 && (
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transactionId: mockTransactions[0].id,
            })
          }
        >
          View sample transaction
        </Button>
      )}
    </Screen>
  );
}
