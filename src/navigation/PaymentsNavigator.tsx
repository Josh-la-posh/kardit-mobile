import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BankAccountPaymentScreen } from '@/features/payments/screens/BankAccountPaymentScreen';
import { FundingSourceSelectionScreen } from '@/features/payments/screens/FundingSourceSelectionScreen';
import { PaymentAuthenticationScreen } from '@/features/payments/screens/PaymentAuthenticationScreen';
import { PaymentDetailsScreen } from '@/features/payments/screens/PaymentDetailsScreen';
import { PaymentResultScreen } from '@/features/payments/screens/PaymentResultScreen';
import { PaymentSummaryScreen } from '@/features/payments/screens/PaymentSummaryScreen';
import { PaymentsScreen } from '@/features/payments/screens/PaymentsScreen';
import { QrPaymentScreen } from '@/features/payments/screens/QrPaymentScreen';
import { QrScanUploadScreen } from '@/features/payments/screens/QrScanUploadScreen';

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
        name="QrScanUpload"
        component={QrScanUploadScreen}
        options={{ title: 'Scan or Upload QR' }}
      />
      <Stack.Screen
        name="BankAccountPayment"
        component={BankAccountPaymentScreen}
        options={{ title: 'Bank Account Payment' }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetailsScreen}
        options={{ title: 'Payment Details' }}
      />
      <Stack.Screen
        name="FundingSourceSelection"
        component={FundingSourceSelectionScreen}
        options={{ title: 'Funding Source' }}
      />
      <Stack.Screen
        name="PaymentSummary"
        component={PaymentSummaryScreen}
        options={{ title: 'Payment Summary' }}
      />
      <Stack.Screen
        name="PaymentAuthentication"
        component={PaymentAuthenticationScreen}
        options={{ title: 'Payment Authentication' }}
      />
      <Stack.Screen
        name="PaymentResult"
        component={PaymentResultScreen}
        options={{ title: 'Payment Status' }}
      />
    </Stack.Navigator>
  );
}
