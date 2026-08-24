import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { radii, shadows, spacing, typography, useTheme } from '@/theme';

export function InfoCard({ children, title }: PropsWithChildren<{ title: string }>) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.titleText }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.small,
  },
  title: {
    fontSize: typography.hSm,
    fontWeight: '600',
  },
});
