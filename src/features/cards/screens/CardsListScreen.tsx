import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import {
  getActiveCardCount,
  hasCardCapacityPlaceholder,
  placeholderMaxActiveCards,
} from '@/features/cards/cardRules';
import type { CardsStackParamList } from '@/navigation/types';
import { colors, spacing } from '@/theme';
import { mockCards } from '@/utils/mockData';

type Props = NativeStackScreenProps<CardsStackParamList, 'CardsList'>;

export function CardsListScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="UnionPay cards">
        <Text>
          {getActiveCardCount(mockCards)} active of {placeholderMaxActiveCards} placeholder
          capacity.
        </Text>
        <Text>Capacity available: {hasCardCapacityPlaceholder(mockCards) ? 'Yes' : 'No'}.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('SelectIssuingBank')}>Request card</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('CreateCard')}>
        Legacy create-card placeholder
      </Button>
      {mockCards.length === 0 ? (
        <EmptyState
          title="No cards yet"
          message="Eligible importers will be able to create and fund cards."
        />
      ) : (
        mockCards.map((card) => (
          <Pressable
            key={card.id}
            onPress={() => navigation.navigate('CardDetails', { cardId: card.id })}
            style={styles.cardRow}
          >
            <View>
              <Text style={styles.title}>{card.label}</Text>
              <Text style={styles.muted}>
                {card.bankName} • {card.type} • {card.status}
              </Text>
              <Text style={styles.muted}>{card.maskedNumber}</Text>
            </View>
            <Text style={styles.balance}>{card.balance}</Text>
          </Pressable>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  title: { color: colors.text, fontWeight: '700' },
  muted: { color: colors.textMuted },
  balance: { color: colors.primary, fontWeight: '800' },
});
