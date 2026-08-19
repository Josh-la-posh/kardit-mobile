import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export function SectionHeader({ action, title }: { action?: string; title: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    color: colors.ink,
    fontSize: typography.hSm,
    fontWeight: '600',
  },
  action: {
    color: colors.forest,
    fontSize: typography.small,
    fontWeight: '600',
  },
});
