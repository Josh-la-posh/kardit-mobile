import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography, useTheme } from '@/theme';

export function ListItem({
  detail,
  meta,
  onPress,
  title,
}: {
  detail?: string;
  meta?: string;
  onPress?: () => void;
  title: string;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={[styles.item, { backgroundColor: colors.lineSoft }]}
    >
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.ink }]}>{title}</Text>
        {meta ? <Text style={[styles.meta, { color: colors.muted }]}>{meta}</Text> : null}
      </View>
      {detail ? <Text style={[styles.detail, { color: colors.ink2 }]}>{detail}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  detail: {
    fontSize: typography.small,
    fontWeight: '600',
    textAlign: 'right',
  },
  item: {
    alignItems: 'center',
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  meta: {
    fontSize: typography.small,
    lineHeight: 19,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});
