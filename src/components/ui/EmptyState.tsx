import { StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography, useTheme } from '@/theme';

export function EmptyState({ message, title }: { title: string; message: string }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  message: {
    fontSize: typography.small,
  },
});
