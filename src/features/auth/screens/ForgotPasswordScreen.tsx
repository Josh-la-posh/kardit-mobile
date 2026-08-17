import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ForgotPasswordScreen() {
  return (
    <Screen>
      <Text>TODO: Wire to password recovery endpoint when auth design is finalized.</Text>
      <Text>Password recovery remains a placeholder and does not submit to a real API yet.</Text>
      <Input label="Email" placeholder="importer@example.com" />
      <Button>Send reset link</Button>
    </Screen>
  );
}
