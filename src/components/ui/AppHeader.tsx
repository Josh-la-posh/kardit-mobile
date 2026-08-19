import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type AppHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function AppHeader({ eyebrow = 'Demo workspace', subtitle, title }: AppHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.forestDeep,
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontSize: typography.hLg,
    fontWeight: '600',
    lineHeight: 35,
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.muted,
    lineHeight: 20,
  },
});
