import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { CardPreview } from '@/components/ui/CardPreview';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { MoneyText } from '@/components/ui/MoneyText';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  canShowSensitiveCardDataPlaceholder,
  getCardCapabilitiesPlaceholder,
  physicalCardSensitiveDataUnavailableNote,
} from '@/features/cards/cardRules';
import type { CardsStackParamList } from '@/navigation/types';
import { radii, spacing, typography, useTheme } from '@/theme';
import { mockCardTransactions, mockCards, mockVirtualCardSensitiveDetails } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardDetails'>;
type CardAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  permitted: boolean;
};

export function CardDetailsScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const card = mockCards.find((item) => item.id === route.params.cardId) ?? mockCards[0];
  const transactions = mockCardTransactions[card.id] ?? [];
  const capabilities = card.capabilities ?? getCardCapabilitiesPlaceholder(card);
  const actions: CardAction[] = [
    {
      icon: 'add-circle-outline' as const,
      label: 'Fund card',
      onPress: () => navigation.navigate('FundCard', { cardId: route.params.cardId }),
      permitted: true,
    },
    ...capabilities.map((capability) => ({
      icon:
        capability.operation === 'freeze'
          ? ('snow-outline' as const)
          : capability.operation === 'unfreeze'
            ? ('sunny-outline' as const)
            : capability.operation === 'reset_pin'
              ? ('keypad-outline' as const)
              : capability.operation === 'terminate'
                ? ('trash-outline' as const)
                : ('card-outline' as const),
      label: capability.operation.replace(/_/g, ' '),
      permitted: capability.permitted,
    })),
  ];

  return (
    <Screen>
      <AppHeader title="Cards" subtitle="Card details and controls." />
      <CardPreview card={card} fullWidth />

      <View style={styles.balanceStatusRow}>
        <View style={[styles.summaryTile, { backgroundColor: colors.card, borderColor: colors.line }]}>
          <View>
            <Text style={[styles.caption, { color: colors.textMuted }]}>Available balance</Text>
            <MoneyText size="medium">{card.balance}</MoneyText>
          </View>
        </View>
        <View style={[styles.summaryTile, { backgroundColor: colors.card, borderColor: colors.line }]}>
          <Text style={[styles.caption, { color: colors.textMuted }]}>Card status</Text>
          <StatusPill label={card.status} tone={card.status === 'active' ? 'success' : 'warning'} />
        </View>
      </View>

      <InfoCard title="Card details">
        <ListItem title="Card name" detail={card.label} />
        <ListItem title="Card number" detail={card.maskedNumber ?? 'Masked'} />
        <ListItem title="Card holder" detail={card.holderName ?? 'Unavailable'} />
        <ListItem title="Month/year" detail={card.expiry ?? 'Unavailable'} />
        <ListItem title="Type" detail={card.type} />
        <ListItem title="Issuing bank" detail={card.bankName} />
      </InfoCard>

      <InfoCard title="Secure card data">
        {canShowSensitiveCardDataPlaceholder(card) ? (
          <>
            <Text style={[styles.note, { color: colors.textMuted }]}>
              Sensitive values stay masked until the authorized reveal flow is available.
            </Text>
            <ListItem title="PAN" detail={mockVirtualCardSensitiveDetails.panPlaceholder} />
            <ListItem title="Expiry" detail={mockVirtualCardSensitiveDetails.expiryPlaceholder} />
            <ListItem title="CVV" detail={mockVirtualCardSensitiveDetails.cvvPlaceholder} />
          </>
        ) : (
          <Text style={[styles.note, { color: colors.textMuted }]}>
            {physicalCardSensitiveDataUnavailableNote}
          </Text>
        )}
      </InfoCard>

      <InfoCard title="Recent activity">
        {transactions.length === 0 ? (
          <EmptyState
            title="No card transactions"
            message="Card transaction history will appear here after backend contracts are confirmed."
          />
        ) : (
          transactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              title={transaction.description}
              meta={transaction.createdAt}
              detail={`${transaction.amount} (${transaction.status})`}
            />
          ))
        )}
      </InfoCard>

      <InfoCard title="Card actions">
        {actions.map((action) => (
          <Pressable
            accessibilityRole="button"
            disabled={!action.permitted}
            key={action.label}
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.actionRow,
              { backgroundColor: colors.buttonBackground, borderColor: colors.border },
              !action.permitted && styles.disabled,
              pressed && action.permitted && styles.pressed,
            ]}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primaryMuted }]}>
                <Ionicons color={colors.primary} name={action.icon} size={18} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.titleText }]}>
                {action.label}
              </Text>
            </View>
            <Ionicons color={colors.textMuted} name="chevron-forward" size={18} />
          </Pressable>
        ))}
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  actionLabel: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  actionLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionRow: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    padding: spacing.md,
  },
  balanceStatusRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  caption: {
    fontSize: typography.small,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
  },
  note: {
    fontSize: typography.small,
    lineHeight: 20,
  },
  summaryTile: {
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 74,
    padding: spacing.md,
  },
});
