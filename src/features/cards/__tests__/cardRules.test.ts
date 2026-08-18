import {
  canShowSensitiveCardDataPlaceholder,
  getActiveCardCount,
  getCardCapabilitiesPlaceholder,
  hasCardCapacityPlaceholder,
  placeholderMaxActiveCards,
} from '@/features/cards/cardRules';
import type { ImporterCard } from '@/types/importer';

const activeVirtualCard: ImporterCard = {
  id: 'card_001',
  balance: 'NGN 1,000',
  bankName: 'Sample Bank',
  label: 'Virtual card',
  status: 'active',
  type: 'virtual',
};

describe('cardRules placeholder helpers', () => {
  it('counts only active cards toward placeholder capacity', () => {
    expect(
      getActiveCardCount([
        activeVirtualCard,
        { ...activeVirtualCard, id: 'card_002', status: 'frozen' },
      ]),
    ).toBe(1);
  });

  it('detects placeholder capacity at the configured maximum', () => {
    const cards = Array.from({ length: placeholderMaxActiveCards }, (_, index) => ({
      ...activeVirtualCard,
      id: `card_${index}`,
    }));

    expect(hasCardCapacityPlaceholder(cards)).toBe(false);
  });

  it('permits activation only for pending cards in placeholder capabilities', () => {
    const activeCapabilities = getCardCapabilitiesPlaceholder(activeVirtualCard);
    const pendingCapabilities = getCardCapabilitiesPlaceholder({
      ...activeVirtualCard,
      status: 'pending',
    });

    expect(
      activeCapabilities.find((capability) => capability.operation === 'activate')?.permitted,
    ).toBe(false);
    expect(
      pendingCapabilities.find((capability) => capability.operation === 'activate')?.permitted,
    ).toBe(true);
  });

  it('marks only virtual cards as eligible for sensitive-data placeholder display', () => {
    expect(canShowSensitiveCardDataPlaceholder(activeVirtualCard)).toBe(true);
    expect(canShowSensitiveCardDataPlaceholder({ ...activeVirtualCard, type: 'physical' })).toBe(
      false,
    );
  });
});
