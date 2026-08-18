import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CasesStackParamList } from '@/navigation/types';
import { mockCases } from '@/utils/mockData';

type Props = NativeStackScreenProps<CasesStackParamList, 'CasesHome'>;

export function CasesScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Case management">
        <Text>
          PRD-ready placeholder for creating cases, linking cards or transactions, attaching
          supporting information, and tracking Service Provider updates.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CaseType')}>Create case placeholder</Button>
      {mockCases.length === 0 ? (
        <EmptyState title="No cases" message="Support cases and their statuses will appear here." />
      ) : (
        mockCases.map((supportCase) => (
          <InfoCard key={supportCase.id} title={supportCase.title}>
            <Text>Reference: {supportCase.reference}</Text>
            <Text>Status: {supportCase.status}</Text>
            <Text>Priority: {supportCase.priority}</Text>
            <Text>Updated: {supportCase.lastUpdatedAt}</Text>
            <Button
              variant="secondary"
              onPress={() => navigation.navigate('CaseDetails', { caseId: supportCase.id })}
            >
              View case
            </Button>
          </InfoCard>
        ))
      )}
    </Screen>
  );
}
