import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { CasesStackParamList } from '@/navigation/types';
import { mockCases } from '@/utils/mockData';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseInformationResponse'>;

export function CaseInformationResponseScreen({ navigation, route }: Props) {
  const supportCase = mockCases.find((item) => item.id === route.params.caseId) ?? mockCases[0];

  return (
    <Screen>
      <InfoCard title="Additional information">
        <Text>{supportCase.informationRequest ?? 'No information request placeholder.'}</Text>
      </InfoCard>
      <Input label="Response" placeholder="Provide requested information" multiline />
      <Button onPress={() => navigation.navigate('CaseDetails', { caseId: supportCase.id })}>
        Submit placeholder response
      </Button>
    </Screen>
  );
}
