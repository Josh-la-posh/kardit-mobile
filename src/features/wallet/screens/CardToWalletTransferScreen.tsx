import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { WalletStackParamList } from '@/navigation/types';
import { mockCardFundingSources, mockWalletFundingSource } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'CardToWalletTransfer'>;

export function CardToWalletTransferScreen({ navigation }: Props) {
  const selectedCard = mockCardFundingSources[0];

  return (
    <Screen>
      <InfoCard title="Card to wallet">
        <Text>
          Placeholder transfer form. Source: {selectedCard.label}. Destination:{' '}
          {mockWalletFundingSource.label}. Backend validation rules are pending.
        </Text>
      </InfoCard>
      <Select
        label="Source card"
        placeholder="Select eligible UnionPay card"
        value={selectedCard.label}
      />
      <Input label="Amount" placeholder="0.00" keyboardType="numeric" />
      <Button onPress={() => navigation.navigate('TransferSummary')}>
        Preview transfer summary
      </Button>
    </Screen>
  );
}
