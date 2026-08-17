import type { ImporterCard } from '@/types/importer';

import { apiClient } from './client';

// TODO: Replace placeholder importer card paths and payloads with confirmed backend contracts.
export const cardsApi = {
  listCards: () => apiClient.get<ImporterCard[]>('/importers/cards'),
  getCard: (cardId: string) => apiClient.get<ImporterCard>(`/importers/cards/${cardId}`),
  createCard: (payload: unknown) => apiClient.post<ImporterCard>('/importers/cards', payload),
  fundCard: (cardId: string, payload: unknown) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/fund`, payload),
};
