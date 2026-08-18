import { getAppGate } from '@/navigation/appGate';
import type { AccountReadiness, AuthenticatedSession } from '@/types/session';

const session: AuthenticatedSession = {
  token: 'token',
  userId: 'user_001',
};

const readyReadiness: AccountReadiness = {
  account: undefined,
  approvalStatus: 'approved',
  onboardingStatus: 'approved',
  provisioningStatus: 'ready',
  walletAssignmentStatus: 'assigned',
  walletStatus: 'active',
};

const readyAccount = {
  id: 'account_001',
  profile: {
    accountId: 'account_001',
    businessName: 'Sample Importer Ltd.',
    email: 'importer@example.com',
    fullName: 'Sample Importer',
    role: 'importer' as const,
  },
  provisioningStatus: 'ready' as const,
  wallet: {
    id: 'wallet_001',
    accountId: 'account_001',
    balance: { amount: '1000', currency: 'NGN' as const, formatted: 'NGN 1,000' },
    status: 'active' as const,
  },
};

const readyReadinessWithAccount: AccountReadiness = {
  ...readyReadiness,
  account: readyAccount,
};

describe('getAppGate', () => {
  it('returns loading while hydrating', () => {
    expect(getAppGate({ isHydrating: true })).toBe('loading');
  });

  it('returns unauthenticated without a session', () => {
    expect(getAppGate({ isHydrating: false })).toBe('unauthenticated');
  });

  it('routes incomplete onboarding to onboarding_required', () => {
    expect(
      getAppGate({
        isHydrating: false,
        readiness: { ...readyReadiness, onboardingStatus: 'in_progress' },
        session,
      }),
    ).toBe('onboarding_required');
  });

  it('routes review and provisioning states before ready', () => {
    expect(
      getAppGate({
        isHydrating: false,
        readiness: { ...readyReadiness, approvalStatus: 'under_review' },
        session,
      }),
    ).toBe('compliance_review');

    expect(
      getAppGate({
        isHydrating: false,
        readiness: { ...readyReadiness, provisioningStatus: 'provisioning' },
        session,
      }),
    ).toBe('provisioning_pending');
  });

  it('requires assigned wallet before ready', () => {
    expect(
      getAppGate({
        isHydrating: false,
        readiness: {
          ...readyReadiness,
          account: { ...readyAccount, wallet: undefined },
          walletAssignmentStatus: 'pending',
        },
        session,
      }),
    ).toBe('wallet_pending');
  });

  it('returns ready when session, approval, provisioning, and wallet are ready', () => {
    expect(getAppGate({ isHydrating: false, readiness: readyReadinessWithAccount, session })).toBe(
      'ready',
    );
  });
});
