import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BusinessProfile'>;

export function BusinessProfileScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Import profile" subtitle="Tell Kardit what your business imports." />
      <StepIndicator current={4} total={6} />
      <Select label="Primary import category" placeholder="Select category" />
      <Input label="Estimated monthly import value" placeholder="Amount" keyboardType="numeric" />
      <Button onPress={() => navigation.navigate('ReviewDeclaration')}>Continue</Button>
    </Screen>
  );
}
