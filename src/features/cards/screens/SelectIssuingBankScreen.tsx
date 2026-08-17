import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CardsStackParamList } from '@/navigation/types';
import { mockIssuingBanks } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'SelectIssuingBank'>;

export function SelectIssuingBankScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Select issuing bank">
        <Text>
          PRD-ready placeholder for choosing from eligible issuing banks. Final eligibility rules
          are pending backend contracts.
        </Text>
        {mockIssuingBanks.map((bank) => (
          <Text key={bank.id}>
            {bank.name}: {bank.supportedCardTypes.join(', ')}
          </Text>
        ))}
      </InfoCard>
      <Button onPress={() => navigation.navigate('SelectCardType')}>Continue</Button>
    </Screen>
  );
}
