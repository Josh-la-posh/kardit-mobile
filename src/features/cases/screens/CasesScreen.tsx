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
      <Button onPress={() => navigation.navigate('CreateCase')}>Create case placeholder</Button>
      {mockCases.length === 0 ? (
        <EmptyState title="No cases" message="Support cases and their statuses will appear here." />
      ) : (
        <Button
          variant="secondary"
          onPress={() => navigation.navigate('CaseDetails', { caseId: mockCases[0].id })}
        >
          View sample case
        </Button>
      )}
    </Screen>
  );
}
