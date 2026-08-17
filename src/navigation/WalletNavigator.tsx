import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FundsTransferScreen } from '@/features/wallet/screens/FundsTransferScreen';
import { WalletScreen } from '@/features/wallet/screens/WalletScreen';

import type { WalletStackParamList } from './types';

const Stack = createNativeStackNavigator<WalletStackParamList>();

export function WalletNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WalletHome" component={WalletScreen} options={{ title: 'Wallet' }} />
      <Stack.Screen
        name="FundsTransfer"
        component={FundsTransferScreen}
        options={{ title: 'Funds Transfer' }}
      />
    </Stack.Navigator>
  );
}
