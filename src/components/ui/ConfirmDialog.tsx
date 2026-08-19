import { Modal, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { radii, shadows, spacing, typography, useTheme } from '@/theme';

export function ConfirmDialog({
  confirmLabel = 'Confirm',
  message,
  onCancel,
  onConfirm,
  title,
  visible,
}: {
  confirmLabel?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  visible: boolean;
}) {
  const { colors } = useTheme();

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={[styles.dialog, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.ink }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.muted }]}>{message}</Text>
          <View style={styles.actions}>
            <Button onPress={onCancel} variant="ghost">
              Cancel
            </Button>
            <Button onPress={onConfirm}>{confirmLabel}</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
  },
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.42)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dialog: {
    borderRadius: radii.lg,
    gap: spacing.lg,
    padding: spacing.xl,
    width: '100%',
    ...shadows.large,
  },
  message: {
    fontSize: typography.body,
    lineHeight: 22,
  },
  title: {
    fontSize: typography.hMd,
    fontWeight: '700',
  },
});
