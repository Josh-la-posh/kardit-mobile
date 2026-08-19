import { StyleSheet, Text } from 'react-native';

import { typography, useTheme } from '@/theme';

export function MoneyText({
  children,
  size = 'large',
}: {
  children: string;
  size?: 'large' | 'medium';
}) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.money, { color: colors.ink }, size === 'medium' && styles.medium]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  money: {
    fontSize: typography.hLg,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  medium: {
    fontSize: typography.hMd,
  },
});
