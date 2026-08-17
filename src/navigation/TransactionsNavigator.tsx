import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionDetailsScreen } from '@/features/transactions/screens/TransactionDetailsScreen';
import { TransactionsScreen } from '@/features/transactions/screens/TransactionsScreen';

import type { TransactionsStackParamList } from './types';

const Stack = createNativeStackNavigator<TransactionsStackParamList>();

export function TransactionsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionsHome"
        component={TransactionsScreen}
        options={{ title: 'Transactions' }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
        options={{ title: 'Transaction Details' }}
      />
    </Stack.Navigator>
  );
}
