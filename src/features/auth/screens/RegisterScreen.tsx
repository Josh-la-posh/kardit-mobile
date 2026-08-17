import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

export function RegisterScreen() {
  const signInPlaceholder = useAuthStore((state) => state.signInPlaceholder);

  return (
    <Screen>
      <Text>TODO: Replace with importer registration API contract and verification flow.</Text>
      <Input label="Email" placeholder="importer@example.com" />
      <Input label="Password" placeholder="Minimum 8 characters" secureTextEntry />
      <Button onPress={() => void signInPlaceholder()}>Create account</Button>
    </Screen>
  );
}
