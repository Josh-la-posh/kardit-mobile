import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import type { TransactionsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionDetails'>;

export function TransactionDetailsScreen({ route }: Props) {
  return (
    <Screen>
      <InfoCard title="Transaction details">
        <Text>
          PRD-ready placeholder for transaction {route.params.transactionId}, payment status,
          funding source, supporting documents, and audit trail.
        </Text>
      </InfoCard>
    </Screen>
  );
}
