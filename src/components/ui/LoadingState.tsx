import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme';

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  label: {
    color: colors.textMuted,
  },
});
