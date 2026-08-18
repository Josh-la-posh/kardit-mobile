import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CasesStackParamList } from '@/navigation/types';
import { mockCases } from '@/utils/mockData';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseDetails'>;

export function CaseDetailsScreen({ navigation, route }: Props) {
  const supportCase = mockCases.find((item) => item.id === route.params.caseId) ?? mockCases[0];

  return (
    <Screen>
      <InfoCard title={supportCase.title}>
        <Text>Reference: {supportCase.reference}</Text>
        <Text>Status: {supportCase.status}</Text>
        <Text>Priority: {supportCase.priority}</Text>
        <Text>Type: {supportCase.type}</Text>
        <Text>Description: {supportCase.description}</Text>
        <Text>Related record: {supportCase.relatedRecord?.label ?? 'Not linked'}</Text>
      </InfoCard>
      <InfoCard title="Evidence">
        {supportCase.evidence?.length ? (
          supportCase.evidence.map((item) => (
            <Text key={item.id}>
              {item.fileName}: {item.uploadedAt ?? 'Pending upload'}
            </Text>
          ))
        ) : (
          <EmptyState title="No evidence" message="Evidence attachments will appear here." />
        )}
      </InfoCard>
      <InfoCard title="Case updates">
        {supportCase.updates.map((update) => (
          <Text key={update.id}>
            {update.author}: {update.message}
          </Text>
        ))}
      </InfoCard>
      <Button onPress={() => navigation.navigate('CaseEvidence', { caseId: supportCase.id })}>
        Attach evidence placeholder
      </Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('CaseInformationResponse', { caseId: supportCase.id })}
      >
        Respond to request placeholder
      </Button>
    </Screen>
  );
}
