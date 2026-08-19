import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ReviewDeclaration'>;

export function ReviewDeclarationScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Review" subtitle="Confirm your demo application details." />
      <StepIndicator current={5} total={6} />
      <InfoCard title="Review summary">
        <ListItem title="Business type" detail="Registered business" />
        <ListItem title="Documents" detail="Pending upload" />
        <ListItem title="Declaration" detail="Demo only" />
      </InfoCard>
      <Button onPress={() => navigation.navigate('ApplicationStatus')}>Submit application</Button>
    </Screen>
  );
}
