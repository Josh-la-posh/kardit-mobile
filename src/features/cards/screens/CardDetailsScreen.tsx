import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
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
      <InfoCard title={card.label}>
        <Text>Masked number: {card.maskedNumber}</Text>
        <Text>Type: {card.type}</Text>
        <Text>Status: {card.status}</Text>
        <Text>Issuing bank: {card.bankName}</Text>
        <Text>Balance: {card.balance}</Text>
      </InfoCard>

      <InfoCard title="Available card data">
        <Text>Only non-sensitive card metadata is shown in this placeholder foundation.</Text>
      </InfoCard>

      <InfoCard title="Sensitive data placeholder">
        {canShowSensitiveCardDataPlaceholder(card) ? (
          <>
            <Text>TODO: Fetch virtual card sensitive data from CMS only when authorized.</Text>
            <Text>PAN: {mockVirtualCardSensitiveDetails.panPlaceholder}</Text>
            <Text>Expiry: {mockVirtualCardSensitiveDetails.expiryPlaceholder}</Text>
            <Text>CVV: {mockVirtualCardSensitiveDetails.cvvPlaceholder}</Text>
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
            <Text key={transaction.id}>
              {transaction.description}: {transaction.amount} ({transaction.status})
            </Text>
          ))
        )}
      </InfoCard>

      <InfoCard title="Card actions">
        {capabilities.map((capability) => (
          <Text key={capability.operation}>
            {capability.operation}:{' '}
            {capability.permitted ? 'placeholder available' : 'not permitted'}
          </Text>
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
