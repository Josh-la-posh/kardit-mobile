import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '@/theme';

export function MoneyText({
  children,
  size = 'large',
}: {
  children: string;
  size?: 'large' | 'medium';
}) {
  return <Text style={[styles.money, size === 'medium' && styles.medium]}>{children}</Text>;
}

const styles = StyleSheet.create({
  money: {
    color: colors.ink,
    fontSize: typography.hLg,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  medium: {
    fontSize: typography.hMd,
  },
});
