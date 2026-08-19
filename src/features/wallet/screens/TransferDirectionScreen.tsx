import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { ActionTile } from '@/components/ui/ActionTile';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { WalletStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<WalletStackParamList, 'TransferDirection'>;

export function TransferDirectionScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Move funds"
        subtitle="Choose a demo transfer direction. Limits, fees, FX quotes, and idempotency rules are backend-owned."
      />
      <InfoCard title="Transfer rules">
        <ListItem
          title="Backend validation pending"
          meta="No real balance movement occurs in this demo flow."
          detail="Demo"
        />
      </InfoCard>
      <ActionTile
        icon="card-outline"
        label="Card to wallet"
        onPress={() => navigation.navigate('CardToWalletTransfer')}
      />
      <ActionTile
        icon="wallet-outline"
        label="Wallet to card"
        onPress={() => navigation.navigate('WalletToCardTransfer')}
      />
      <Button onPress={() => navigation.navigate('CardToWalletTransfer')}>Card to wallet</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('WalletToCardTransfer')}>
        Wallet to card
      </Button>
    </Screen>
  );
}
