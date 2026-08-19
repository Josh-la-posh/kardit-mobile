import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';

export function ForgotPasswordScreen() {
  return (
    <Screen>
      <AppHeader
        title="Forgot password"
        subtitle="Preview the credential recovery screen without submitting to a real API."
      />
      <InfoCard title="Recovery contract pending">
        <ListItem
          title="No reset link is sent"
          meta="Backend must confirm reset endpoint, token expiry, and delivery channel."
          detail="Demo"
        />
      </InfoCard>
      <Input label="Email" placeholder="importer@example.com" />
      <Button>Send reset link</Button>
    </Screen>
  );
}
