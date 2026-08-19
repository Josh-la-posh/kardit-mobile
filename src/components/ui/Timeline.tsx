import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography, useTheme } from '@/theme';

type TimelineItem = {
  id: string;
  label: string;
  meta?: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: colors.forest }]} />
          <View style={styles.copy}>
            <Text style={[styles.label, { color: colors.ink }]}>{item.label}</Text>
            {item.meta ? (
              <Text style={[styles.meta, { color: colors.muted }]}>{item.meta}</Text>
            ) : null}
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
    borderRadius: 5,
    height: 10,
    marginTop: 4,
    width: 10,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  meta: {
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
