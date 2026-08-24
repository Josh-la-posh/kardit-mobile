import Constants from 'expo-constants';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const extra = Constants.expoConfig?.extra ?? {};
const apiBaseUrl = trimTrailingSlash(
  process.env.EXPO_PUBLIC_API_BASE_URL || String(extra.apiBaseUrl || ''),
);

export const env = {
  apiBaseUrl,
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT || String(extra.environment || 'development'),
};
