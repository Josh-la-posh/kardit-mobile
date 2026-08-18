import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { TransactionsStackParamList } from '@/navigation/types';
import {
  mockComplianceDocuments,
  mockTransactions,
  mockTransactionTimeline,
} from '@/utils/mockData';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionDetails'>;

export function TransactionDetailsScreen({ route }: Props) {
  const transaction =
    mockTransactions.find((item) => item.id === route.params.transactionId) ?? mockTransactions[0];
  const documents = mockComplianceDocuments.filter(
    (document) => document.transactionId === transaction.id,
  );
  const timeline = mockTransactionTimeline[transaction.id] ?? [];

  return (
    <Screen>
      <InfoCard title={transaction.title}>
        <Text>Reference: {transaction.reference}</Text>
        <Text>Status: {transaction.status}</Text>
        <Text>Amount: {transaction.amount.formatted}</Text>
        <Text>Type: {transaction.type}</Text>
        <Text>Route: {transaction.paymentRoute ?? 'Not applicable'}</Text>
        <Text>
          Funding source: {transaction.fundingSourceLabel ?? transaction.fundingSourceType}
        </Text>
        <Text>Related record: {transaction.relatedRecordLabel ?? 'Not linked'}</Text>
      </InfoCard>
      <InfoCard title="Linked documents">
        {documents.length === 0 ? (
          <EmptyState
            title="No linked documents"
            message="Supporting documents will appear here after document contracts are confirmed."
          />
        ) : (
          documents.map((document) => (
            <Text key={document.id}>
              {document.fileName}: {document.status}
            </Text>
          ))
        )}
      </InfoCard>
      <InfoCard title="Status timeline">
        {timeline.map((item) => (
          <Text key={item.id}>
            {item.label}: {item.status}
          </Text>
        ))}
      </InfoCard>
      <Button variant="secondary">Retry placeholder</Button>
      <Button variant="ghost">Create support case placeholder</Button>
    </Screen>
  );
}
