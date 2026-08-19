import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { LoginForm } from '@/components/forms/LoginForm';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const signInPlaceholder = useAuthStore((state) => state.signInPlaceholder);

  return (
    <Screen>
      <AppHeader
        title="Login"
        subtitle="Use any valid email and 8-character password to enter the local demo session."
      />
      <InfoCard title="Placeholder behavior">
        <ListItem
          title="No real authentication"
          meta="The app hydrates demo readiness and does not call backend auth endpoints yet."
          detail="Demo"
        />
      </InfoCard>
      <LoginForm onSubmit={() => void signInPlaceholder()} />
      <Button variant="ghost" onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password
      </Button>
    </Screen>
  );
}
