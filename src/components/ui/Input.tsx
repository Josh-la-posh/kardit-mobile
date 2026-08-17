import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ error, label, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.textMuted} style={styles.input} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  error: {
    color: colors.danger,
    fontSize: typography.small,
  },
});
