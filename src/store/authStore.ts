import { create } from 'zustand';

import { tokenStorage } from '@/services/storage/tokenStorage';

type AuthState = {
  hydrateAuth: () => Promise<void>;
  isAuthenticated: boolean;
  isHydrating: boolean;
  signInPlaceholder: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  hydrateAuth: async () => {
    const token = await tokenStorage.getToken();
    set({ isAuthenticated: Boolean(token), isHydrating: false });
  },
  isAuthenticated: false,
  isHydrating: true,
  signInPlaceholder: async () => {
    await tokenStorage.setToken('placeholder-importer-auth-token');
    set({ isAuthenticated: true });
  },
  signOut: async () => {
    await tokenStorage.clearToken();
    set({ isAuthenticated: false });
  },
}));
