import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BusinessProfile'>;

export function BusinessProfileScreen({ navigation }: Props) {
  return (
    <Screen>
      <Text>TODO: Selected import categories may trigger regulatory requirements.</Text>
      <Select label="Primary import category" placeholder="Select category" />
      <Input label="Estimated monthly import value" placeholder="Amount" keyboardType="numeric" />
      <Button onPress={() => navigation.navigate('ReviewDeclaration')}>Continue</Button>
    </Screen>
  );
}
