import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import { LoadingState } from '@/components/ui/LoadingState';
import { AccountProvisioningPendingScreen } from '@/features/onboarding/screens/AccountProvisioningPendingScreen';
import { AdditionalInformationRequiredScreen } from '@/features/onboarding/screens/AdditionalInformationRequiredScreen';
import { ApplicationStatusScreen } from '@/features/onboarding/screens/ApplicationStatusScreen';
import { WalletAssignmentPendingScreen } from '@/features/onboarding/screens/WalletAssignmentPendingScreen';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/theme';

import { getAppGate } from './appGate';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { OnboardingNavigator } from './OnboardingNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const accountReadiness = useAuthStore((state) => state.accountReadiness);
  const isHydrating = useAuthStore((state) => state.isHydrating);
  const session = useAuthStore((state) => state.session);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    void hydrateAuth();
  }, [hydrateAuth]);

  const appGate = getAppGate({ isHydrating, readiness: accountReadiness, session });

  if (appGate === 'loading') {
    return <LoadingState label="Preparing Kardit Importer" />;
  }

  return (
    <NavigationContainer
      theme={{
        ...(isDark ? DarkTheme : DefaultTheme),
        colors: {
          ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
          background: colors.background,
          border: colors.line,
          card: colors.card,
          primary: colors.primary,
          text: colors.text,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      >
        {appGate === 'unauthenticated' ? (
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        ) : appGate === 'onboarding_required' ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingNavigator}
            options={{ headerShown: false }}
          />
        ) : appGate === 'compliance_review' ? (
          <Stack.Screen
            name="ApplicationStatus"
            component={ApplicationStatusScreen}
            options={{ title: 'Application Status' }}
          />
        ) : appGate === 'additional_information_required' ? (
          <Stack.Screen
            name="AdditionalInformationRequired"
            component={AdditionalInformationRequiredScreen}
            options={{ title: 'Additional Information' }}
          />
        ) : appGate === 'provisioning_pending' ? (
          <Stack.Screen
            name="AccountProvisioningPending"
            component={AccountProvisioningPendingScreen}
            options={{ title: 'Account Provisioning' }}
          />
        ) : appGate === 'wallet_pending' ? (
          <Stack.Screen
            name="WalletAssignmentPending"
            component={WalletAssignmentPendingScreen}
            options={{ title: 'Wallet Assignment' }}
          />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
