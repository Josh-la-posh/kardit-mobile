import type { IssuingBank } from '@/types/importer';

import { apiClient } from './client';

// TODO: Replace placeholder issuing-bank path with the confirmed backend contract.
export const banksApi = {
  listIssuingBanks: () => apiClient.get<IssuingBank[]>('/importers/issuing-banks'),
};
