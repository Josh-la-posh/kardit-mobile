import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { documentDecisioningNote } from '@/features/documents/documentRules';
import type { DocumentsStackParamList } from '@/navigation/types';
import { mockComplianceDocuments } from '@/utils/mockData';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'DocumentsHome'>;

export function DocumentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Compliance documents"
        subtitle="Track demo document requirements, uploads, links, and validation status."
      />
      <InfoCard title="Rule ownership">
        <ListItem
          title="Backend/Core decides requirements"
          meta={documentDecisioningNote}
          detail="Pending"
        />
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
          <ListItem
            key={document.id}
            title={document.fileName}
            meta={`${document.type} | ${document.required ? 'Required' : 'Optional'}`}
            detail={document.status}
            onPress={() => navigation.navigate('DocumentDetails', { documentId: document.id })}
          />
        ))
      )}
    </Screen>
  );
}
