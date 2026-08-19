import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { RootStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        eyebrow="Kardit business"
        title="Importer mobile workspace"
        subtitle="Demo screens for onboarding, wallet funding, UnionPay cards, supplier payments, documents, transactions, support, and account controls."
      />
      <InfoCard title="Demo access">
        <Text style={styles.muted}>
          Backend endpoints are pending. Login and registration create a local demo session only.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>Login</Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
      >
        Register
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, fontSize: typography.small, lineHeight: 20 },
  stack: { gap: spacing.md },
});
