import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { LoginForm } from '@/components/forms/LoginForm';
import { Button } from '@/components/ui/Button';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const signInPlaceholder = useAuthStore((state) => state.signInPlaceholder);

  return (
    <Screen>
      <Text>
        Demo sign-in uses placeholder session and readiness state until real auth APIs are
        confirmed.
      </Text>
      <LoginForm onSubmit={() => void signInPlaceholder()} />
      <Button variant="ghost" onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password
      </Button>
    </Screen>
  );
}
