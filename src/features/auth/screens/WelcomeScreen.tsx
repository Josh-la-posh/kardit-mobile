import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <Text style={styles.title}>Kardit Importer</Text>
      <Text style={styles.copy}>
        A dedicated mobile experience for importer onboarding, card issuance, funding, and
        application tracking.
      </Text>
      <InfoCard title="Stakeholder intro">
        <Text style={styles.muted}>
          Placeholder content for importer-specific value proposition and eligibility messaging.
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
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800' },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: 24 },
  muted: { color: colors.textMuted },
});
