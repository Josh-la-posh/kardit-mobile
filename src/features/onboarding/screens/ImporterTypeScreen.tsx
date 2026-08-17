import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ImporterType'>;

export function ImporterTypeScreen({ navigation }: Props) {
  return (
    <Screen>
      <Text>
        TODO: Confirm importer applicant types and whether role affects required documents.
      </Text>
      <Select label="Importer type" placeholder="Select importer type" />
      <Button onPress={() => navigation.navigate('ApplicantInformation')}>Continue</Button>
    </Screen>
  );
}
