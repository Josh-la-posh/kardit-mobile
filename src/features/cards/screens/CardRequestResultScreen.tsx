import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CardsStackParamList } from '@/navigation/types';
import { mockCardRequestResult } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardRequestResult'>;

export function CardRequestResultScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Card request status">
        <Text>Reference: {mockCardRequestResult.reference}</Text>
        <Text>Status: {mockCardRequestResult.status}</Text>
        <Text>Real issuance status polling is pending backend contracts.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CardsList')}>Done</Button>
    </Screen>
  );
}
