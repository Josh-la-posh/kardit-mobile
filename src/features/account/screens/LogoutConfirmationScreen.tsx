import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { AccountStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AccountStackParamList, 'LogoutConfirmation'>;

export function LogoutConfirmationScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Log out">
        <Text>
          Placeholder confirmation. Real logout/session revocation API is pending backend contracts.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('LogoutResult')}>Log out placeholder</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('AccountDetails')}>
        Cancel
      </Button>
    </Screen>
  );
}
