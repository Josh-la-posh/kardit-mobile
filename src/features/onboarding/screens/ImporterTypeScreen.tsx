import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { Select } from '@/components/ui/Select';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ImporterType'>;

export function ImporterTypeScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        eyebrow="Onboarding demo"
        title="Business type"
        subtitle="Choose how your importer business is registered."
      />
      <StepIndicator current={1} total={6} />
      <InfoCard title="Applicant type">
        <ListItem
          title="Rule pending"
          meta="Requirements may vary for LLC or registered business."
          detail="Demo"
        />
      </InfoCard>
      <Select label="Importer type" placeholder="Select importer type" />
      <Button onPress={() => navigation.navigate('ApplicantInformation')}>Continue</Button>
    </Screen>
  );
}
