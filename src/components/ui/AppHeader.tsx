import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography, useTheme } from '@/theme';

type AppHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function AppHeader({ eyebrow = 'Demo workspace', subtitle, title }: AppHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.eyebrow, { color: colors.iconColor }]}>{eyebrow}</Text>
      <Text style={[styles.title, { color: colors.titleText }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  eyebrow: {
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: typography.hLg,
    fontWeight: '600',
    lineHeight: 35,
  },
  subtitle: {
    fontSize: typography.muted,
    lineHeight: 20,
  },
});
