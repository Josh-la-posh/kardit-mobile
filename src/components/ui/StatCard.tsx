import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '@/theme';

export function StatCard({ label, meta, value }: { label: string; meta?: string; value: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    ...shadows.small,
  },
  label: {
    color: colors.muted,
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  meta: {
    color: colors.muted2,
    fontSize: typography.small,
  },
  value: {
    color: colors.ink,
    fontSize: typography.hMd,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
});
