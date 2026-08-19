import { StyleSheet, Text, View } from 'react-native';

import { radii, shadows, spacing, typography, useTheme } from '@/theme';

export function StatCard({ label, meta, value }: { label: string; meta?: string; value: string }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.line }]}>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.ink }]}>{value}</Text>
      {meta ? <Text style={[styles.meta, { color: colors.muted2 }]}>{meta}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    ...shadows.small,
  },
  label: {
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  meta: {
    fontSize: typography.small,
  },
  value: {
    fontSize: typography.hMd,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
});
