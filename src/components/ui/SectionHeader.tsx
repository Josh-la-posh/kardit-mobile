import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography, useTheme } from '@/theme';

export function SectionHeader({
  action,
  onActionPress,
  title,
}: {
  action?: string;
  onActionPress?: () => void;
  title: string;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.ink }]}>{title}</Text>
      {action ? (
        <Text onPress={onActionPress} style={[styles.action, { color: colors.forest }]}>
          {action}
        </Text>
      ) : null}
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
    fontSize: typography.hSm,
    fontWeight: '600',
  },
  action: {
    fontSize: typography.small,
    fontWeight: '600',
  },
});
