import type { ImporterAccount, ImporterProfile } from '@/types/account';
import type { AccountReadiness } from '@/types/session';

import { apiClient } from './client';

// TODO: Confirm account readiness, profile, and logout/session-revocation contracts with Kardit Core.
export const accountApi = {
  getAccount: () => apiClient.get<ImporterAccount>('/importers/account'),
  getAccountReadiness: () => apiClient.get<AccountReadiness>('/importers/account/readiness'),
  getProfile: () => apiClient.get<ImporterProfile>('/importers/account/profile'),
  logout: () => apiClient.post<{ signedOut: boolean }>('/importers/auth/logout', {}),
};
