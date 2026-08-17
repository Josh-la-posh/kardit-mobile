import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<WalletStackParamList, 'FundsTransfer'>;

export function FundsTransferScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Funds transfer">
        <Text>
          PRD-ready placeholder for Card to Wallet and Wallet to Card transfer validation, summary,
          submission, and result states.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('TransferDirection')}>
        Select transfer direction
      </Button>
      <Button variant="secondary" onPress={() => navigation.navigate('CardToWalletTransfer')}>
        Card to wallet
      </Button>
      <Button variant="secondary" onPress={() => navigation.navigate('WalletToCardTransfer')}>
        Wallet to card
      </Button>
    </Screen>
  );
}
