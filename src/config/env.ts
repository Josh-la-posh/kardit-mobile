import Constants from 'expo-constants';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const extra = Constants.expoConfig?.extra ?? {};
const apiBaseUrl = trimTrailingSlash(
  process.env.EXPO_PUBLIC_API_BASE_URL || String(extra.apiBaseUrl || ''),
);
const onboardingApiMode =
  process.env.EXPO_PUBLIC_ONBOARDING_API_MODE ||
  String(extra.onboardingApiMode || 'auto');

export const env = {
  apiBaseUrl,
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT || String(extra.environment || 'development'),
  onboardingApiMode,
  useMockOnboardingApi:
    onboardingApiMode === 'mock' ||
    (onboardingApiMode === 'auto' &&
      (!apiBaseUrl || apiBaseUrl.includes('api.example.invalid'))),
};
