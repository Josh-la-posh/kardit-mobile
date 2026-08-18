import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { documentDecisioningNote } from '@/features/documents/documentRules';
import type { DocumentsStackParamList } from '@/navigation/types';
import { mockComplianceDocuments } from '@/utils/mockData';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'DocumentsHome'>;

export function DocumentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Compliance documents">
        <Text>{documentDecisioningNote}</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('UploadDocument', {})}>
        Upload document placeholder
      </Button>
      {mockComplianceDocuments.length === 0 ? (
        <EmptyState
          title="No documents"
          message="Compliance documents linked to payments and transactions will appear here."
        />
      ) : (
        mockComplianceDocuments.map((document) => (
          <InfoCard key={document.id} title={document.fileName}>
            <Text>Type: {document.type}</Text>
            <Text>Status: {document.status}</Text>
            <Text>Required: {document.required ? 'Yes' : 'No'}</Text>
            <Button
              variant="secondary"
              onPress={() => navigation.navigate('DocumentDetails', { documentId: document.id })}
            >
              View document
            </Button>
          </InfoCard>
        ))
      )}
    </Screen>
  );
}
