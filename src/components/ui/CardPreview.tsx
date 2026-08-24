import { Pressable, StyleSheet, Text, View } from 'react-native';

import { shadows, spacing, typography, useTheme } from '@/theme';
import type { ImporterCard } from '@/types/importer';

export function CardPreview({
  card,
  fullWidth,
  onPress,
}: {
  card: ImporterCard;
  fullWidth?: boolean;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  const cardNumber = card.maskedNumber ?? '6229 3461 **** ****';
  const cardHolder = card.holderName ?? 'CARD HOLDER';
  const expiry = card.expiry ?? 'MM/YY';

  const content = (
    <>
      <View style={styles.topRow}>
        <Text style={styles.product}>Prepaid Gold</Text>
        <View style={styles.alatMark}>
          <Text style={styles.alatIcon}>A</Text>
          <Text style={styles.alatText}>ALAT</Text>
        </View>
      </View>

      <View style={styles.hexLayer}>
        {Array.from({ length: 12 }).map((_, index) => (
          <View key={index} style={styles.hexagon} />
        ))}
      </View>

      <View style={styles.techRow}>
        <View style={styles.chip}>
          <View style={styles.chipLine} />
          <View style={styles.chipGrid}>
            <View style={styles.chipCell} />
            <View style={styles.chipCell} />
            <View style={styles.chipCell} />
            <View style={styles.chipCell} />
          </View>
        </View>
        <View style={styles.contactless}>
          <View style={styles.waveSmall} />
          <View style={styles.waveMedium} />
          <View style={styles.waveLarge} />
        </View>
      </View>

      <Text style={styles.number}>{cardNumber}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.holder} numberOfLines={1}>
          {cardHolder}
        </Text>
        <View style={styles.expiryBlock}>
          <Text style={styles.expiryLabel}>MONTH/YEAR</Text>
          <Text style={styles.expiryLabel}>EXP</Text>
          <Text style={styles.expiry}>{expiry}</Text>
        </View>
        <View style={styles.unionPay}>
          <View style={[styles.unionSegment, styles.unionRed]} />
          <View style={[styles.unionSegment, styles.unionBlue]} />
          <View style={[styles.unionSegment, styles.unionTeal]} />
          <Text style={styles.unionText}>UnionPay</Text>
        </View>
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
          fullWidth ? styles.fullWidth : styles.fixedWidth,
          { borderColor: colors.line },
          pressed && styles.pressed,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, fullWidth ? styles.fullWidth : styles.fixedWidth, { borderColor: colors.line }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  alatIcon: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 36,
  },
  alatMark: {
    alignItems: 'center',
  },
  alatText: {
    color: '#FFFFFF',
    fontSize: typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 3,
  },
  bottomRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  card: {
    aspectRatio: 1.62,
    backgroundColor: '#4B4A41',
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: spacing.lg,
    ...shadows.medium,
  },
  chip: {
    backgroundColor: '#D8B64C',
    borderColor: '#F4D66E',
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    padding: 5,
    width: 56,
  },
  chipCell: {
    borderColor: 'rgba(90,72,16,0.45)',
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    margin: 1,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 24,
  },
  chipLine: {
    alignSelf: 'center',
    backgroundColor: 'rgba(90,72,16,0.45)',
    height: 2,
    marginBottom: 3,
    width: 34,
  },
  contactless: {
    flexDirection: 'row',
    height: 52,
    width: 48,
  },
  expiry: {
    color: '#111111',
    fontSize: typography.hSm,
    fontWeight: '700',
  },
  expiryBlock: {
    alignItems: 'flex-start',
    minWidth: 58,
  },
  expiryLabel: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 11,
  },
  fixedWidth: {
    width: 300,
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  hexLayer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    opacity: 0.16,
    position: 'absolute',
    right: 12,
    top: 68,
    width: '55%',
  },
  hexagon: {
    borderColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    height: 26,
    transform: [{ rotate: '30deg' }],
    width: 26,
  },
  holder: {
    color: '#161616',
    flex: 1,
    fontSize: typography.hSm,
    fontWeight: '700',
  },
  number: {
    color: '#111111',
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  product: {
    color: '#FFFFFF',
    fontSize: typography.hMd,
    fontWeight: '700',
  },
  techRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unionBlue: {
    backgroundColor: '#2C338C',
  },
  unionPay: {
    borderRadius: 8,
    flexDirection: 'row',
    height: 42,
    overflow: 'hidden',
    position: 'relative',
    width: 92,
  },
  unionRed: {
    backgroundColor: '#F0234D',
  },
  unionSegment: {
    flex: 1,
  },
  unionTeal: {
    backgroundColor: '#18A8A9',
  },
  unionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    left: 9,
    position: 'absolute',
    top: 12,
  },
  waveLarge: {
    borderColor: '#F5F5F0',
    borderRadius: 20,
    borderRightWidth: 5,
    height: 40,
    left: 15,
    position: 'absolute',
    top: 6,
    width: 24,
  },
  waveMedium: {
    borderColor: '#F5F5F0',
    borderRadius: 18,
    borderRightWidth: 5,
    height: 30,
    left: 8,
    position: 'absolute',
    top: 11,
    width: 20,
  },
  waveSmall: {
    borderColor: '#F5F5F0',
    borderRadius: 12,
    borderRightWidth: 5,
    height: 20,
    left: 2,
    position: 'absolute',
    top: 16,
    width: 14,
  },
});
