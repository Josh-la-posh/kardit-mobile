import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';
import { mockWallet } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'WalletHome'>;

export function WalletScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Central wallet">
        <Text>
          PRD-ready placeholder for the importer wallet balance, wallet status, and wallet-based
          activity controls. Mock balance: {mockWallet.balance.formatted}.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('FundsTransfer')}>Funds transfer</Button>
    </Screen>
  );
}
