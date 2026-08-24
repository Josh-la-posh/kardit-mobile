import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radii, shadows, spacing, typography, useTheme } from '@/theme';
import type { ImporterCard } from '@/types/importer';

export function CardPreview({ card, onPress }: { card: ImporterCard; onPress?: () => void }) {
  const { colors } = useTheme();
  const content = (
    <>
      <View style={styles.row}>
        <Text style={styles.brand}>Kardit</Text>
        <Text style={styles.pill}>{card.status}</Text>
      </View>
      <Text style={styles.title}>{card.label}</Text>
      <Text style={styles.number}>{card.maskedNumber ?? '**** **** **** ****'}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.caption}>Available</Text>
          <Text style={styles.balance}>{card.balance}</Text>
        </View>
        <Text style={styles.type}>{card.type}</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.accent },
          pressed && styles.pressed,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.accent }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    color: '#FFFFFF',
    fontSize: typography.hSm,
    fontWeight: '700',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: typography.body,
    fontWeight: '700',
  },
  caption: {
    color: '#CDE5D5',
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: radii.xl,
    gap: spacing.lg,
    minHeight: 190,
    padding: spacing.xl,
    width: 292,
    ...shadows.medium,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  number: {
    color: '#FFFFFF',
    fontSize: typography.body,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
    letterSpacing: 1,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radii.xl,
    color: '#FFFFFF',
    fontSize: typography.eyebrow,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    textTransform: 'uppercase',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#DDEFE4',
    fontSize: typography.small,
    fontWeight: '600',
  },
  type: {
    color: '#CDE5D5',
    fontSize: typography.small,
    textTransform: 'capitalize',
  },
});
