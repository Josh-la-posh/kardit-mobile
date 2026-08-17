import { apiClient } from './client';

export type LoginRequest = { email: string; password: string };
export type AuthResponse = { token: string; userId: string };

// TODO: Replace placeholder importer auth paths with confirmed backend contracts.
export const authApi = {
  login: (request: LoginRequest) => apiClient.post<AuthResponse>('/importers/auth/login', request),
  register: (request: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/importers/auth/register', request),
  forgotPassword: (email: string) =>
    apiClient.post<{ accepted: boolean }>('/importers/auth/forgot-password', { email }),
};
