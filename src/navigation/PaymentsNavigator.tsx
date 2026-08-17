import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BankAccountPaymentScreen } from '@/features/payments/screens/BankAccountPaymentScreen';
import { PaymentsScreen } from '@/features/payments/screens/PaymentsScreen';
import { QrPaymentScreen } from '@/features/payments/screens/QrPaymentScreen';

import type { PaymentsStackParamList } from './types';

const Stack = createNativeStackNavigator<PaymentsStackParamList>();

export function PaymentsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PaymentsHome"
        component={PaymentsScreen}
        options={{ title: 'Payments' }}
      />
      <Stack.Screen
        name="QrPayment"
        component={QrPaymentScreen}
        options={{ title: 'QR Payment' }}
      />
      <Stack.Screen
        name="BankAccountPayment"
        component={BankAccountPaymentScreen}
        options={{ title: 'Bank Account Payment' }}
      />
    </Stack.Navigator>
  );
}
