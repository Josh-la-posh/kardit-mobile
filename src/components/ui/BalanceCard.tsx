import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { radii, shadows, spacing, typography, useTheme } from '@/theme';

export function BalanceCard({
  balance,
  onAddMoney,
  onPaySupplier,
}: {
  balance: string;
  onAddMoney?: () => void;
  onPaySupplier?: () => void;
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.forestDeep }]}>
      <Text style={styles.label}>Available balance</Text>
      <Text style={styles.balance}>{balance}</Text>
      <Text style={styles.meta}>Central wallet</Text>
      <View style={styles.actions}>
        <Button onPress={onAddMoney} variant="secondary">
          Add money
        </Button>
        <Button onPress={onPaySupplier} variant="secondary">
          Pay supplier
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  card: {
    borderRadius: radii.xl,
    gap: spacing.sm,
    padding: spacing.xl,
    ...shadows.medium,
  },
  label: {
    color: '#DDEFE4',
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  meta: {
    color: '#CDE5D5',
    fontSize: typography.small,
  },
});
