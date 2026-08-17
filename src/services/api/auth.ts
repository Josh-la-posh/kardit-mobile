import type { AuthenticatedSession } from '@/types/session';

import { apiClient } from './client';

export type LoginRequest = { email: string; password: string };
export type AuthResponse = AuthenticatedSession;

// TODO: Replace placeholder importer auth paths and session shape with confirmed backend contracts.
export const authApi = {
  getCurrentSession: () => apiClient.get<AuthResponse>('/importers/auth/session'),
  login: (request: LoginRequest) => apiClient.post<AuthResponse>('/importers/auth/login', request),
  register: (request: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/importers/auth/register', request),
  forgotPassword: (email: string) =>
    apiClient.post<{ accepted: boolean }>('/importers/auth/forgot-password', { email }),
  revokeSession: () => apiClient.post<{ revoked: boolean }>('/importers/auth/session/revoke', {}),
};
