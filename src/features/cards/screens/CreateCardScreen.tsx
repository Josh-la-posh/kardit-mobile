import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Select } from '@/components/ui/Select';
import { placeholderMaxActiveCards } from '@/features/cards/cardRules';
import type { CardsStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { mockCards, mockIssuingBanks } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CreateCard'>;

export function CreateCardScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Issuing bank options">
        <Text>
          TODO: Importers can select from all available issuing banks during issuance. Current
          placeholder banks: {mockIssuingBanks.map((bank) => bank.name).join(', ')}.
        </Text>
      </InfoCard>
      <Text>
        TODO: Confirm maximum active card capacity. Placeholder capacity: {mockCards.length}/
        {placeholderMaxActiveCards}.
      </Text>
      <Select label="Issuing bank" placeholder="Select issuing bank" />
      <Select label="Card type" placeholder="Virtual or physical" />
      <Button onPress={() => navigation.navigate('SelectIssuingBank')}>
        Start request flow placeholder
      </Button>
    </Screen>
  );
}
