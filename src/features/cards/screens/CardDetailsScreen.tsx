import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
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
import { mockCardTransactions, mockCards, mockVirtualCardSensitiveDetails } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardDetails'>;

export function CardDetailsScreen({ navigation, route }: Props) {
  const card = mockCards.find((item) => item.id === route.params.cardId) ?? mockCards[0];
  const transactions = mockCardTransactions[card.id] ?? [];
  const capabilities = card.capabilities ?? getCardCapabilitiesPlaceholder(card);

  return (
    <Screen>
      <AppHeader
        title="Card details"
        subtitle="Non-sensitive demo metadata, CMS-sensitive-data placeholder, transactions, and permitted action preview."
      />
      <InfoCard title={card.label}>
        <MoneyText size="medium">{card.balance}</MoneyText>
        <StatusPill label={card.status} tone={card.status === 'active' ? 'success' : 'warning'} />
        <ListItem title="Masked number" detail={card.maskedNumber ?? 'Masked'} />
        <ListItem title="Type" detail={card.type} />
        <ListItem title="Issuing bank" detail={card.bankName} />
      </InfoCard>

      <InfoCard title="Available card data">
        <Text>Only non-sensitive card metadata is shown in this placeholder foundation.</Text>
      </InfoCard>

      <InfoCard title="Sensitive data placeholder">
        {canShowSensitiveCardDataPlaceholder(card) ? (
          <>
            <Text>TODO: Fetch virtual card sensitive data from CMS only when authorized.</Text>
            <ListItem title="PAN" detail={mockVirtualCardSensitiveDetails.panPlaceholder} />
            <ListItem title="Expiry" detail={mockVirtualCardSensitiveDetails.expiryPlaceholder} />
            <ListItem title="CVV" detail={mockVirtualCardSensitiveDetails.cvvPlaceholder} />
          </>
        ) : (
          <Text>{physicalCardSensitiveDataUnavailableNote}</Text>
        )}
      </InfoCard>

      <InfoCard title="Recent card transactions">
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
      <Button onPress={() => navigation.navigate('FundCard', { cardId: route.params.cardId })}>
        Fund card
      </Button>
      <Button variant="secondary">Freeze card placeholder</Button>
      <Button variant="secondary">Unfreeze card placeholder</Button>
      <Button variant="secondary">Terminate card placeholder</Button>
      <Button variant="ghost">Reset PIN / activate placeholder</Button>
    </Screen>
  );
}
