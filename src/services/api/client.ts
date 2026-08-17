import { env } from '@/config/env';
import { tokenStorage } from '@/services/storage/tokenStorage';

import { ApiError } from './apiError';

const safeJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export async function apiRequest<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  if (!env.apiBaseUrl) {
    throw new ApiError('Missing EXPO_PUBLIC_API_BASE_URL', 0, undefined);
  }

  const token = await tokenStorage.getToken();
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await safeJson(response);
    throw new ApiError(`Request failed (${response.status})`, response.status, body);
  }

  return (await safeJson(response)) as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string) => apiRequest<TResponse>(path),
  post: <TResponse>(path: string, body: unknown) =>
    apiRequest<TResponse>(path, { method: 'POST', body: JSON.stringify(body) }),
};
