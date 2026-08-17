import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountDetailsScreen } from '@/features/account/screens/AccountDetailsScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';

import type { AccountStackParamList } from './types';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountHome" component={ProfileScreen} options={{ title: 'Account' }} />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetailsScreen}
        options={{ title: 'Account Details' }}
      />
    </Stack.Navigator>
  );
}
