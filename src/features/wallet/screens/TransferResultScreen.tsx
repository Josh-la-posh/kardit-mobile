import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<WalletStackParamList, 'TransferResult'>;

export function TransferResultScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Transfer status">
        <Text>
          Placeholder transfer result. Real submission, idempotency, balance updates, and
          transaction status polling are pending Kardit Core contracts.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('WalletHome')}>Done</Button>
    </Screen>
  );
}
