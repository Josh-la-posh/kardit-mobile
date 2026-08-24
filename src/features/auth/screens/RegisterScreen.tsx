import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import type { AuthStackParamList, RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Sign up" subtitle="Start importer registration" />
      <Button
        onPress={() =>
          navigation
            .getParent<NativeStackScreenProps<RootStackParamList>['navigation']>()
            ?.navigate('Onboarding', { screen: 'ImporterType' })
        }
      >
        Start new application
      </Button>
    </Screen>
  );
}
