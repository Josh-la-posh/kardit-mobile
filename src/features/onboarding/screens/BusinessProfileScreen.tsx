import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { Select } from '@/components/ui/Select';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { defaultImporterOnboardingDraft } from '@/features/onboarding/importerOnboardingStorage';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BusinessProfile'>;

export function BusinessProfileScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Import profile" subtitle="Tell Kardit what your business imports." />
      <StepIndicator current={3} total={5} />
      <Select label="Business sector" placeholder="Select sector" />
      <Select label="Business activity" placeholder="Select activity" />
      <Select label="Primary import category" placeholder="Select category" />
      <Select label="Import frequency" placeholder="Select frequency" />
      <Input label="Estimated monthly import value" placeholder="Amount" keyboardType="numeric" />
      <ListItem
        title="Validation"
        meta={`${validateImporterOnboardingStep(defaultImporterOnboardingDraft, 3).missing.length} demo issues`}
        detail="Local"
      />
      <Button onPress={() => navigation.navigate('ReviewDeclaration')}>Continue</Button>
    </Screen>
  );
}
