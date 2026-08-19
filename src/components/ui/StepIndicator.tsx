import { StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography, useTheme } from '@/theme';

export function StepIndicator({ current, total }: { current: number; total: number }) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.muted }]}>
        Step {current} of {total}
      </Text>
      <View style={[styles.track, { backgroundColor: colors.line }]}>
        <View
          style={[
            styles.progress,
            { backgroundColor: colors.primary, width: `${(current / total) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  progress: {
    borderRadius: radii.xl,
    height: '100%',
  },
  track: {
    borderRadius: radii.xl,
    height: 8,
    overflow: 'hidden',
  },
  wrapper: {
    gap: spacing.sm,
  },
});
