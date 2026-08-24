import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
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

export function CardDetailsScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const card = mockCards.find((item) => item.id === route.params.cardId) ?? mockCards[0];
  const transactions = mockCardTransactions[card.id] ?? [];
  const capabilities = card.capabilities ?? getCardCapabilitiesPlaceholder(card);

  return (
    <Screen>
      <AppHeader
        title="Card details"
        subtitle="Balance, card information, activity, and available actions."
      />
      <CardPreview card={card} />
      <InfoCard title="Overview">
        <View style={styles.balanceRow}>
          <View>
            <Text style={[styles.caption, { color: colors.textMuted }]}>Available balance</Text>
            <MoneyText size="medium">{card.balance}</MoneyText>
          </View>
          <StatusPill label={card.status} tone={card.status === 'active' ? 'success' : 'warning'} />
        </View>
        <ListItem title="Card name" detail={card.label} />
        <ListItem title="Masked number" detail={card.maskedNumber ?? 'Masked'} />
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
        {capabilities.map((capability) => (
          <ListItem
            key={capability.operation}
            title={capability.operation}
            detail={capability.permitted ? 'Demo available' : 'Not permitted'}
          />
        ))}
      </InfoCard>
      <View style={styles.actions}>
        <Button onPress={() => navigation.navigate('FundCard', { cardId: route.params.cardId })}>
          Fund card
        </Button>
        <Button variant="secondary">Freeze card</Button>
        <Button variant="secondary">Unfreeze card</Button>
        <Button variant="ghost">Reset PIN</Button>
        <View style={[styles.dangerAction, { borderColor: colors.danger }]}>
          <Ionicons color={colors.danger} name="trash-outline" size={18} />
          <Text style={[styles.dangerText, { color: colors.danger }]}>Terminate card</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
  },
  balanceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: {
    fontSize: typography.small,
  },
  dangerAction: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 48,
  },
  dangerText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  note: {
    fontSize: typography.small,
    lineHeight: 20,
  },
});
