import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { CardsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardRequestDetails'>;

export function CardRequestDetailsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Card request details">
        <Text>
          Placeholder for cardholder and request details. Final fields, identity verification, and
          add-existing-card rules are pending Kardit Core contracts.
        </Text>
      </InfoCard>
      <Input label="Card label" placeholder="Procurement card" />
      <Input label="Delivery note" placeholder="Physical card delivery details if required" />
      <Button onPress={() => navigation.navigate('ReviewCardRequest')}>Review request</Button>
    </Screen>
  );
}
