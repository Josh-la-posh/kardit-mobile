import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CardDetailsScreen } from '@/features/cards/screens/CardDetailsScreen';
import { CardRequestDetailsScreen } from '@/features/cards/screens/CardRequestDetailsScreen';
import { CardRequestResultScreen } from '@/features/cards/screens/CardRequestResultScreen';
import { CardsListScreen } from '@/features/cards/screens/CardsListScreen';
import { CreateCardScreen } from '@/features/cards/screens/CreateCardScreen';
import { FundCardScreen } from '@/features/cards/screens/FundCardScreen';
import { ReviewCardRequestScreen } from '@/features/cards/screens/ReviewCardRequestScreen';
import { SelectCardTypeScreen } from '@/features/cards/screens/SelectCardTypeScreen';
import { SelectIssuingBankScreen } from '@/features/cards/screens/SelectIssuingBankScreen';

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
      <Stack.Screen
        name="SelectIssuingBank"
        component={SelectIssuingBankScreen}
        options={{ title: 'Select Issuing Bank' }}
      />
      <Stack.Screen
        name="SelectCardType"
        component={SelectCardTypeScreen}
        options={{ title: 'Select Card Type' }}
      />
      <Stack.Screen
        name="CardRequestDetails"
        component={CardRequestDetailsScreen}
        options={{ title: 'Card Request Details' }}
      />
      <Stack.Screen
        name="ReviewCardRequest"
        component={ReviewCardRequestScreen}
        options={{ title: 'Review Card Request' }}
      />
      <Stack.Screen
        name="CardRequestResult"
        component={CardRequestResultScreen}
        options={{ title: 'Card Request Status' }}
      />
      <Stack.Screen name="FundCard" component={FundCardScreen} options={{ title: 'Fund Card' }} />
    </Stack.Navigator>
  );
}
