import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ApplicantInformation'>;

export function ApplicantInformationScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Organisation details"
        subtitle="Add the importer and representative information."
      />
      <StepIndicator current={2} total={6} />
      <Input label="Legal business name" placeholder="Registered business name" />
      <Input label="Applicant name" placeholder="Representative legal name" />
      <Input label="Phone number" placeholder="+234..." keyboardType="phone-pad" />
      <Button onPress={() => navigation.navigate('DocumentSubmission')}>Continue</Button>
    </Screen>
  );
}
