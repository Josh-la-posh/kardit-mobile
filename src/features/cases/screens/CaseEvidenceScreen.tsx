import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { CasesStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseEvidence'>;

export function CaseEvidenceScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <InfoCard title="Attach evidence">
        <Text>Case: {route.params.caseId ?? 'New placeholder case'}</Text>
        <Text>Real file upload and evidence storage are pending backend contracts.</Text>
      </InfoCard>
      <Input label="Evidence name" placeholder="receipt-placeholder.pdf" />
      <Button onPress={() => navigation.navigate('CasesHome')}>Attach placeholder</Button>
    </Screen>
  );
}
