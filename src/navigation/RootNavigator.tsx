import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import { LoadingState } from '@/components/ui/LoadingState';
import { WelcomeScreen } from '@/features/auth/screens/WelcomeScreen';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme';

import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { OnboardingNavigator } from './OnboardingNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  useEffect(() => {
    void hydrateAuth();
  }, [hydrateAuth]);

  if (isHydrating) {
    return <LoadingState label="Preparing Kardit Importer" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      >
        {isAuthenticated ? (
          <>
            {/* TODO: Add importer onboarding gating when PRD confirms status and resume rules. */}
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
