import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type TimelineItem = {
  id: string;
  label: string;
  meta?: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <View style={styles.wrapper}>
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.dot} />
          <View style={styles.copy}>
            <Text style={styles.label}>{item.label}</Text>
            {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  dot: {
    backgroundColor: colors.forest,
    borderRadius: 5,
    height: 10,
    marginTop: 4,
    width: 10,
  },
  label: {
    color: colors.ink,
    fontSize: typography.body,
    fontWeight: '600',
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  wrapper: {
    gap: spacing.lg,
  },
});
