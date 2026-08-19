import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography, useTheme } from '@/theme';

type SelectProps = {
  label: string;
  value?: string;
  placeholder: string;
  onPress?: () => void;
};

export function Select({ label, onPress, placeholder, value }: SelectProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.control, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <Text style={[styles.value, { color: value ? colors.text : colors.textMuted }]}>
          {value || placeholder}
        </Text>
        <Text style={[styles.chevron, { color: colors.textMuted }]}>v</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.small,
    fontWeight: '600',
  },
  control: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  value: {
    fontSize: typography.body,
  },
  chevron: {
    fontSize: typography.body,
  },
});
