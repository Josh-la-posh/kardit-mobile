import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type Tone = 'success' | 'warning' | 'danger' | 'neutral';

const toneStyles = {
  danger: { backgroundColor: colors.scarletTint, color: colors.scarlet },
  neutral: { backgroundColor: colors.slateTint, color: colors.slate },
  success: { backgroundColor: colors.forestTint, color: colors.forestDeep },
  warning: { backgroundColor: colors.amberTint, color: colors.amber },
};

export function StatusPill({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  const style = toneStyles[tone];

  return (
    <View style={[styles.pill, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.label, { color: style.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radii.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
