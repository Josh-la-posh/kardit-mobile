import type {
  CardRequest,
  CardRequestResult,
  CardTransaction,
  ImporterCard,
  IssuingBank,
  VirtualCardSensitiveDetails,
} from '@/types/importer';

import { apiClient } from './client';

// TODO: Replace placeholder importer card paths and payloads with confirmed backend contracts.
export const cardsApi = {
  getCards: () => apiClient.get<ImporterCard[]>('/importers/cards'),
  listCards: () => apiClient.get<ImporterCard[]>('/importers/cards'),
  getCardDetails: (cardId: string) => apiClient.get<ImporterCard>(`/importers/cards/${cardId}`),
  getCard: (cardId: string) => apiClient.get<ImporterCard>(`/importers/cards/${cardId}`),
  getCardTransactions: (cardId: string) =>
    apiClient.get<CardTransaction[]>(`/importers/cards/${cardId}/transactions`),
  getIssuingBanksForCards: () => apiClient.get<IssuingBank[]>('/importers/cards/issuing-banks'),
  validateCardRequest: (request: CardRequest) =>
    apiClient.post<{ valid: boolean; message?: string }>(
      '/importers/cards/requests/validate',
      request,
    ),
  requestCardIssuance: (request: CardRequest) =>
    apiClient.post<CardRequestResult>('/importers/cards/requests', request),
  getCardRequestStatus: (requestId: string) =>
    apiClient.get<CardRequestResult>(`/importers/cards/requests/${requestId}`),
  createCard: (payload: unknown) => apiClient.post<ImporterCard>('/importers/cards', payload),
  fundCard: (cardId: string, payload: unknown) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/fund`, payload),
  freezeCard: (cardId: string) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/freeze`, {}),
  unfreezeCard: (cardId: string) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/unfreeze`, {}),
  terminateCard: (cardId: string) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/terminate`, {}),
  resetCardPin: (cardId: string) =>
    apiClient.post<{ accepted: boolean }>(`/importers/cards/${cardId}/pin/reset`, {}),
  getVirtualCardSensitiveDetails: (cardId: string) =>
    apiClient.get<VirtualCardSensitiveDetails>(`/importers/cards/${cardId}/sensitive-details`),
};
