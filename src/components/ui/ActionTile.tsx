import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function ActionTile({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.tile}>
      <View style={styles.icon}>
        <Ionicons color={colors.forestDeep} name={icon} size={18} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    backgroundColor: colors.forestTint,
    borderRadius: radii.xl,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  label: {
    color: colors.ink,
    flex: 1,
    fontSize: typography.small,
    fontWeight: '600',
    lineHeight: 18,
  },
  tile: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: radii.md,
    borderWidth: 1,
    flexBasis: '48%',
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 70,
    padding: spacing.md,
  },
});
