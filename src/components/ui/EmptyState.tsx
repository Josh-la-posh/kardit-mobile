import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export function EmptyState({ message, title }: { title: string; message: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  message: {
    color: colors.textMuted,
    fontSize: typography.small,
  },
});
