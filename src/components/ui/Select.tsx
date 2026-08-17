import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type SelectProps = {
  label: string;
  value?: string;
  placeholder: string;
  onPress?: () => void;
};

export function Select({ label, onPress, placeholder, value }: SelectProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.control}>
        <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
        <Text style={styles.chevron}>v</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '700',
  },
  control: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  value: {
    color: colors.text,
    fontSize: typography.body,
  },
  placeholder: {
    color: colors.textMuted,
  },
  chevron: {
    color: colors.textMuted,
  },
});
