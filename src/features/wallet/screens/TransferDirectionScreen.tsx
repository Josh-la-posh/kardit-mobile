import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<WalletStackParamList, 'TransferDirection'>;

export function TransferDirectionScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Select transfer direction">
        <Text>
          PRD-ready placeholder for choosing whether funds move from an eligible UnionPay card to
          the central wallet, or from the wallet to an eligible card.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CardToWalletTransfer')}>Card to wallet</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('WalletToCardTransfer')}>
        Wallet to card
      </Button>
    </Screen>
  );
}
