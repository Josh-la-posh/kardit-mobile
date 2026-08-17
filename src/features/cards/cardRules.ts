import type { CardCapability, CardOperation, ImporterCard } from '@/types/importer';

export const placeholderMaxActiveCards = 6;

export const physicalCardSensitiveDataUnavailableNote =
  'Physical card sensitive data must not be manually captured if CMS cannot provide it.';

export function getActiveCardCount(cards: ImporterCard[]) {
  return cards.filter((card) => card.status === 'active').length;
}

export function hasCardCapacityPlaceholder(cards: ImporterCard[]) {
  // TODO: Confirm final active-card capacity rule with Kardit Core.
  return getActiveCardCount(cards) < placeholderMaxActiveCards;
}

export function getCardCapabilitiesPlaceholder(card: ImporterCard): CardCapability[] {
  const actions: CardOperation[] = [
    'fund',
    card.status === 'frozen' ? 'unfreeze' : 'freeze',
    'terminate',
    'reset_pin',
    'activate',
    'view_transactions',
  ];

  return actions.map((operation) => ({
    operation,
    permitted: operation !== 'activate' || card.status === 'pending',
    reason:
      operation === 'activate' && card.status !== 'pending'
        ? 'Activation placeholder is only shown as permitted for pending cards.'
        : undefined,
  }));
}

export function canShowSensitiveCardDataPlaceholder(card: ImporterCard) {
  // TODO: Replace with CMS-backed sensitive-data availability and authorization checks.
  return card.type === 'virtual';
}
