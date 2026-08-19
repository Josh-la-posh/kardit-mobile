import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'DocumentSubmission'>;

export function DocumentSubmissionScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Documents"
        subtitle="Upload placeholders for business and representative checks."
      />
      <StepIndicator current={3} total={6} />
      <EmptyState
        title="No documents yet"
        message="Document picker will be added after backend upload rules are confirmed."
      />
      <Button onPress={() => navigation.navigate('BusinessProfile')}>Continue</Button>
    </Screen>
  );
}
