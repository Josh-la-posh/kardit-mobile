import type { AppGate, AuthenticatedSession, AccountReadiness } from '@/types/session';

type AppGateInput = {
  isHydrating: boolean;
  readiness?: AccountReadiness;
  session?: AuthenticatedSession;
};

export function getAppGate({ isHydrating, readiness, session }: AppGateInput): AppGate {
  if (isHydrating) return 'loading';
  if (!session) return 'unauthenticated';
  if (!readiness) return 'provisioning_pending';

  if (
    readiness.onboardingStatus === 'not_started' ||
    readiness.onboardingStatus === 'in_progress'
  ) {
    return 'onboarding_required';
  }

  if (
    readiness.approvalStatus === 'additional_information_required' ||
    readiness.onboardingStatus === 'additional_information_required'
  ) {
    return 'additional_information_required';
  }

  if (
    readiness.approvalStatus === 'submitted' ||
    readiness.approvalStatus === 'under_review' ||
    readiness.onboardingStatus === 'submitted' ||
    readiness.onboardingStatus === 'under_review'
  ) {
    return 'compliance_review';
  }

  if (readiness.provisioningStatus !== 'ready') {
    return 'provisioning_pending';
  }

  if (readiness.walletAssignmentStatus !== 'assigned' || !readiness.account?.wallet) {
    return 'wallet_pending';
  }

  return 'ready';
}
