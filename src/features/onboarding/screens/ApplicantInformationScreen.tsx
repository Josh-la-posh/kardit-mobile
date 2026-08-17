import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ApplicantInformation'>;

export function ApplicantInformationScreen({ navigation }: Props) {
  return (
    <Screen>
      <Input label="Applicant name" placeholder="Legal name" />
      <Input label="Organisation name" placeholder="Registered business name" />
      <Input label="Phone number" placeholder="+234..." keyboardType="phone-pad" />
      <Button onPress={() => navigation.navigate('DocumentSubmission')}>Continue</Button>
    </Screen>
  );
}
