import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

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
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={styles.item}
    >
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  detail: {
    color: colors.ink2,
    fontSize: typography.small,
    fontWeight: '600',
    textAlign: 'right',
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.lineSoft,
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 19,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.ink,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
