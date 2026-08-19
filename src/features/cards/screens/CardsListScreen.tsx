import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { CardPreview } from '@/components/ui/CardPreview';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  getActiveCardCount,
  hasCardCapacityPlaceholder,
  placeholderMaxActiveCards,
} from '@/features/cards/cardRules';
import type { CardsStackParamList } from '@/navigation/types';
import { mockCards } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardsList'>;

export function CardsListScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Cards" subtitle="UnionPay cards for importer payments and funding." />
      <InfoCard title="Card capacity">
        <StatusPill
          label={`${getActiveCardCount(mockCards)} of ${placeholderMaxActiveCards} active`}
          tone={hasCardCapacityPlaceholder(mockCards) ? 'success' : 'warning'}
        />
      </InfoCard>
      <Button onPress={() => navigation.navigate('SelectIssuingBank')}>Request card</Button>
      {mockCards.length === 0 ? (
        <EmptyState title="No cards yet" message="Your cards will appear here." />
      ) : (
        mockCards.map((card) => (
          <Button
            key={card.id}
            onPress={() => navigation.navigate('CardDetails', { cardId: card.id })}
            variant="ghost"
          >
            View {card.label}
          </Button>
        ))
      )}
      {mockCards.map((card) => (
        <CardPreview key={`preview-${card.id}`} card={card} />
      ))}
    </Screen>
  );
}
