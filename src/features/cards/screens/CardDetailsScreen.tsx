import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CardsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardDetails'>;

export function CardDetailsScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <InfoCard title={`Card ${route.params.cardId}`}>
        <Text>
          TODO: Sensitive virtual card data can be shown only where available from CMS. Physical
          card sensitive data should not be manually captured if CMS cannot provide it.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('FundCard', { cardId: route.params.cardId })}>
        Fund card
      </Button>
    </Screen>
  );
}
