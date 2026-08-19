import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AccountNavigator } from '@/navigation/AccountNavigator';
import { CasesNavigator } from '@/navigation/CasesNavigator';
import { CardsNavigator } from '@/navigation/CardsNavigator';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { DocumentsNavigator } from '@/navigation/DocumentsNavigator';
import { PaymentsNavigator } from '@/navigation/PaymentsNavigator';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { SupportScreen } from '@/features/profile/screens/SupportScreen';
import { SuppliersNavigator } from '@/navigation/SuppliersNavigator';
import { radii, useTheme } from '@/theme';
import { TransactionsNavigator } from '@/navigation/TransactionsNavigator';
import { WalletNavigator } from '@/navigation/WalletNavigator';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconForRoute = (routeName: keyof MainTabParamList) => {
  const icons = {
    Dashboard: 'grid-outline',
    Wallet: 'wallet-outline',
    Cards: 'card-outline',
    Suppliers: 'people-outline',
    Payments: 'swap-horizontal-outline',
    Transactions: 'receipt-outline',
    Documents: 'document-text-outline',
    Cases: 'chatbox-ellipses-outline',
    Account: 'person-circle-outline',
    Profile: 'person-outline',
    Support: 'help-circle-outline',
  } as const;
  return icons[routeName];
};

export function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderColor: colors.line,
          borderTopLeftRadius: radii.lg,
          borderTopRightRadius: radii.lg,
          minHeight: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconForRoute(route.name)} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Cards" component={CardsNavigator} />
      <Tab.Screen name="Payments" component={PaymentsNavigator} options={{ title: 'Pay' }} />
      <Tab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{ title: 'Activity' }}
      />
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen
        name="Suppliers"
        component={SuppliersNavigator}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsNavigator}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen name="Cases" component={CasesNavigator} options={{ tabBarButton: () => null }} />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Support" component={SupportScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}
