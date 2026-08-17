import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CardsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CardsStackParamList, 'SelectCardType'>;

export function SelectCardTypeScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Select card type">
        <Text>
          PRD-ready placeholder for selecting virtual or physical cards. Add-existing-card versus
          issue-new-card behavior still needs backend confirmation.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CardRequestDetails')}>Virtual card</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('CardRequestDetails')}>
        Physical card
      </Button>
    </Screen>
  );
}
