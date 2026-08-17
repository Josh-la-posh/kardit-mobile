import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'kardit.importer.authToken';

export const tokenStorage = {
  getToken: () => AsyncStorage.getItem(AUTH_TOKEN_KEY),
  setToken: (token: string) => AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
  clearToken: () => AsyncStorage.removeItem(AUTH_TOKEN_KEY),
};
