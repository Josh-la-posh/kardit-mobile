import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import type { AuthStackParamList, RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Sign up"
        subtitle="Start importer registration with demo-only local steps."
      />
      <InfoCard title="Importer onboarding">
        <ListItem
          title="Step-by-step setup"
          meta="Organisation, representative, documents, profile, review, and status."
          detail="Demo"
        />
      </InfoCard>
      <Input label="Email" placeholder="importer@example.com" />
      <Input label="Password" placeholder="Minimum 8 characters" secureTextEntry />
      <Button
        onPress={() =>
          navigation
            .getParent<NativeStackScreenProps<RootStackParamList>['navigation']>()
            ?.navigate('Onboarding', { screen: 'ImporterType' })
        }
      >
        Start registration
      </Button>
    </Screen>
  );
}
