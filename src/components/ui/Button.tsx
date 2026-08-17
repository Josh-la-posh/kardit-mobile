import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}>;

export function Button({ children, disabled, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.label, variant !== 'primary' && styles.secondaryLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryMuted,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    color: colors.surface,
    fontSize: typography.body,
    fontWeight: '700',
  },
  secondaryLabel: {
    color: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});
