import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountDetailsScreen } from '@/features/account/screens/AccountDetailsScreen';
import { AccountSecurityScreen } from '@/features/account/screens/AccountSecurityScreen';
import { LogoutConfirmationScreen } from '@/features/account/screens/LogoutConfirmationScreen';
import { LogoutResultScreen } from '@/features/account/screens/LogoutResultScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { ThemeScreen } from '@/features/profile/screens/ThemeScreen';

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
      <Stack.Screen name="AccountTheme" component={ThemeScreen} options={{ title: 'App Theme' }} />
      <Stack.Screen
        name="AccountSecurity"
        component={AccountSecurityScreen}
        options={{ title: 'Security' }}
      />
      <Stack.Screen
        name="LogoutConfirmation"
        component={LogoutConfirmationScreen}
        options={{ title: 'Log Out' }}
      />
      <Stack.Screen
        name="LogoutResult"
        component={LogoutResultScreen}
        options={{ title: 'Logout Result' }}
      />
    </Stack.Navigator>
  );
}
