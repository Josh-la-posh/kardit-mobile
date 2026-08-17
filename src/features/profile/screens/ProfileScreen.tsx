import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { AccountStackParamList } from '@/navigation/types';

type Props = Partial<NativeStackScreenProps<AccountStackParamList, 'AccountHome'>>;

export function ProfileScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Profile and settings">
        <Text>
          Placeholder for importer organisation profile, user settings, and security controls.
        </Text>
      </InfoCard>
      {navigation ? (
        <Button onPress={() => navigation.navigate('AccountDetails')}>Account details</Button>
      ) : null}
    </Screen>
  );
}
