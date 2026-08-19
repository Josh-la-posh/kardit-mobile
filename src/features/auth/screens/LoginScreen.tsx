import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { LoginForm } from '@/components/forms/LoginForm';
import { Button } from '@/components/ui/Button';
import { StyleSheet, Text, View } from 'react-native';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { spacing, typography, useTheme } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const signInPlaceholder = useAuthStore((state) => state.signInPlaceholder);
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={[styles.logo, { backgroundColor: colors.forestDeep }]}>
        <Text style={styles.logoText}>K</Text>
      </View>
      <View style={styles.heading}>
        <Text style={[styles.title, { color: colors.ink }]}>Sign in</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Access your importer workspace.
        </Text>
      </View>
      <LoginForm onSubmit={() => void signInPlaceholder()} />
      <Button variant="secondary" onPress={() => navigation.navigate('Register')}>
        Sign up
      </Button>
      <Button variant="ghost" onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    gap: spacing.xs,
  },
  logo: {
    alignItems: 'center',
    borderRadius: 24,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: typography.hMd,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: typography.body,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
});
