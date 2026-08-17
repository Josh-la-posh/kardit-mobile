import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CardsStackParamList } from '@/navigation/types';
import { mockIssuingBanks } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'ReviewCardRequest'>;

export function ReviewCardRequestScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Review card request">
        <Text>Issuing bank placeholder: {mockIssuingBanks[0].name}</Text>
        <Text>Card type placeholder: Virtual</Text>
        <Text>Backend validation and request submission are not implemented in this phase.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CardRequestResult')}>
        Submit placeholder request
      </Button>
    </Screen>
  );
}
