import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { radii, spacing, typography, useTheme } from '@/theme';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ error, label, ...props }: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.ink2 }]}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
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
  input: {
    borderRadius: radii.md,
    borderWidth: 1,
    fontSize: typography.body,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  error: {
    fontSize: typography.small,
  },
});
