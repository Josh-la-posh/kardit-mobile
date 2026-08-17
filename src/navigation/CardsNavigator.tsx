import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CardDetailsScreen } from '@/features/cards/screens/CardDetailsScreen';
import { CardsListScreen } from '@/features/cards/screens/CardsListScreen';
import { CreateCardScreen } from '@/features/cards/screens/CreateCardScreen';
import { FundCardScreen } from '@/features/cards/screens/FundCardScreen';

import type { CardsStackParamList } from './types';

const Stack = createNativeStackNavigator<CardsStackParamList>();

export function CardsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CardsList" component={CardsListScreen} options={{ title: 'Cards' }} />
      <Stack.Screen
        name="CardDetails"
        component={CardDetailsScreen}
        options={{ title: 'Card Details' }}
      />
      <Stack.Screen
        name="CreateCard"
        component={CreateCardScreen}
        options={{ title: 'Create Card' }}
      />
      <Stack.Screen name="FundCard" component={FundCardScreen} options={{ title: 'Fund Card' }} />
    </Stack.Navigator>
  );
}
