import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CardToWalletTransferScreen } from '@/features/wallet/screens/CardToWalletTransferScreen';
import { FundsTransferScreen } from '@/features/wallet/screens/FundsTransferScreen';
import { TransferDirectionScreen } from '@/features/wallet/screens/TransferDirectionScreen';
import { TransferResultScreen } from '@/features/wallet/screens/TransferResultScreen';
import { TransferSummaryScreen } from '@/features/wallet/screens/TransferSummaryScreen';
import { WalletScreen } from '@/features/wallet/screens/WalletScreen';
import { WalletToCardTransferScreen } from '@/features/wallet/screens/WalletToCardTransferScreen';

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
      <Stack.Screen
        name="TransferDirection"
        component={TransferDirectionScreen}
        options={{ title: 'Transfer Direction' }}
      />
      <Stack.Screen
        name="CardToWalletTransfer"
        component={CardToWalletTransferScreen}
        options={{ title: 'Card to Wallet' }}
      />
      <Stack.Screen
        name="WalletToCardTransfer"
        component={WalletToCardTransferScreen}
        options={{ title: 'Wallet to Card' }}
      />
      <Stack.Screen
        name="TransferSummary"
        component={TransferSummaryScreen}
        options={{ title: 'Transfer Summary' }}
      />
      <Stack.Screen
        name="TransferResult"
        component={TransferResultScreen}
        options={{ title: 'Transfer Status' }}
      />
    </Stack.Navigator>
  );
}
