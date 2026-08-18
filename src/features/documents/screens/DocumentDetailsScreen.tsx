import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { DocumentsStackParamList } from '@/navigation/types';
import { mockComplianceDocuments } from '@/utils/mockData';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'DocumentDetails'>;

export function DocumentDetailsScreen({ navigation, route }: Props) {
  const document =
    mockComplianceDocuments.find((item) => item.id === route.params.documentId) ??
    mockComplianceDocuments[0];

  return (
    <Screen>
      <InfoCard title={document.fileName}>
        <Text>ID: {document.id}</Text>
        <Text>Type: {document.type}</Text>
        <Text>Status: {document.status}</Text>
        <Text>Transaction: {document.transactionId ?? 'Not linked'}</Text>
        <Text>Payment: {document.linkedPaymentId ?? 'Not linked'}</Text>
        <Text>Uploaded: {document.uploadedAt ?? 'Pending upload'}</Text>
        <Text>Expires: {document.expiresAt ?? 'Not applicable'}</Text>
        <Text>Reason: {document.rejectionReason ?? 'No additional information requested'}</Text>
      </InfoCard>
      <Button
        onPress={() =>
          navigation.navigate('DocumentLink', {
            documentId: document.id,
            transactionId: document.transactionId,
          })
        }
      >
        Link to transaction placeholder
      </Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('DocumentStatus', { documentId: document.id })}
      >
        Validate/status placeholder
      </Button>
    </Screen>
  );
}
