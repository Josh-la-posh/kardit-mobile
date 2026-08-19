import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { useAuthStore } from '@/store/authStore';

export function RegisterScreen() {
  const signInPlaceholder = useAuthStore((state) => state.signInPlaceholder);

  return (
    <Screen>
      <AppHeader
        title="Register"
        subtitle="Create a local demo session while importer registration contracts are pending."
      />
      <InfoCard title="Registration contract pending">
        <ListItem
          title="Demo account only"
          meta="No email verification, KYC submission, or backend account creation occurs."
          detail="Local"
        />
      </InfoCard>
      <Input label="Email" placeholder="importer@example.com" />
      <Input label="Password" placeholder="Minimum 8 characters" secureTextEntry />
      <Button onPress={() => void signInPlaceholder()}>Create account</Button>
    </Screen>
  );
}
