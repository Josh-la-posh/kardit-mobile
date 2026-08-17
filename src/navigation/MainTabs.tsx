import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CardsNavigator } from '@/navigation/CardsNavigator';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { SupportScreen } from '@/features/profile/screens/SupportScreen';
import { TransactionsScreen } from '@/features/transactions/screens/TransactionsScreen';
import { colors } from '@/theme';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconForRoute = (routeName: keyof MainTabParamList) => {
  const icons = {
    Dashboard: 'grid-outline',
    Cards: 'card-outline',
    Transactions: 'receipt-outline',
    Profile: 'person-outline',
    Support: 'help-circle-outline',
  } as const;
  return icons[routeName];
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconForRoute(route.name)} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Cards" component={CardsNavigator} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
}
