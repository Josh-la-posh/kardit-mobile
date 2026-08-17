import { create } from 'zustand';

import { tokenStorage } from '@/services/storage/tokenStorage';
import type { ImporterAccount } from '@/types/account';
import type { AccountReadiness, AuthenticatedSession } from '@/types/session';
import { mockAccount } from '@/utils/mockData';

type AuthState = {
  accountReadiness?: AccountReadiness;
  hydrateAuth: () => Promise<void>;
  isAuthenticated: boolean;
  isHydrating: boolean;
  resetSession: () => Promise<void>;
  session?: AuthenticatedSession;
  signInPlaceholder: () => Promise<void>;
  signInPlaceholderForGate: (readiness: AccountReadiness) => Promise<void>;
  signOut: () => Promise<void>;
};

const placeholderToken = 'placeholder-importer-auth-token';

const createPlaceholderSession = (
  account: ImporterAccount = mockAccount,
): AuthenticatedSession => ({
  token: placeholderToken,
  userId: account.profile.accountId,
  profile: account.profile,
});

const createReadyPlaceholderReadiness = (
  account: ImporterAccount = mockAccount,
): AccountReadiness => ({
  account,
  approvalStatus: 'approved',
  onboardingStatus: 'approved',
  provisioningStatus: account.provisioningStatus,
  walletAssignmentStatus: account.wallet ? 'assigned' : 'pending',
  walletStatus: account.wallet?.status,
});

export const useAuthStore = create<AuthState>((set) => ({
  accountReadiness: undefined,
  hydrateAuth: async () => {
    const token = await tokenStorage.getToken();
    // TODO: Replace placeholder session/readiness hydration with get-current-session and account readiness APIs.
    set({
      accountReadiness: token ? createReadyPlaceholderReadiness() : undefined,
      isAuthenticated: Boolean(token),
      isHydrating: false,
      session: token ? createPlaceholderSession() : undefined,
    });
  },
  isAuthenticated: false,
  isHydrating: true,
  resetSession: async () => {
    await tokenStorage.clearToken();
    set({ accountReadiness: undefined, isAuthenticated: false, session: undefined });
  },
  signInPlaceholder: async () => {
    // TODO: Replace with authApi.login, token persistence, and account readiness fetch.
    await tokenStorage.setToken(placeholderToken);
    set({
      accountReadiness: createReadyPlaceholderReadiness(),
      isAuthenticated: true,
      session: createPlaceholderSession(),
    });
  },
  signInPlaceholderForGate: async (readiness) => {
    await tokenStorage.setToken(placeholderToken);
    set({
      accountReadiness: readiness,
      isAuthenticated: true,
      session: createPlaceholderSession(readiness.account),
    });
  },
  signOut: async () => {
    // TODO: Call logout/revoke-session API when the backend contract is confirmed.
    await tokenStorage.clearToken();
    set({ accountReadiness: undefined, isAuthenticated: false, session: undefined });
  },
}));
