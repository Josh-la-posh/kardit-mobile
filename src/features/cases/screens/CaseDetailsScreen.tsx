import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CasesStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseDetails'>;

export function CaseDetailsScreen({ route }: Props) {
  return (
    <Screen>
      <InfoCard title="Case details">
        <Text>
          PRD-ready placeholder for case {route.params.caseId}, status updates, attachments, and
          additional information responses.
        </Text>
      </InfoCard>
    </Screen>
  );
}
