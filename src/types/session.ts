import type { AccountProvisioningStatus, ImporterAccount, ImporterProfile } from './account';
import type { WalletStatus } from './wallet';

export type ImporterApprovalStatus =
  | 'not_started'
  | 'submitted'
  | 'under_review'
  | 'additional_information_required'
  | 'approved'
  | 'rejected';

export type OnboardingStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'additional_information_required'
  | 'approved'
  | 'rejected';

export type WalletAssignmentStatus = 'pending' | 'assigned' | 'failed';

export type AuthenticatedSession = {
  token: string;
  userId: string;
  profile?: ImporterProfile;
};

export type AccountReadiness = {
  account?: ImporterAccount;
  approvalStatus: ImporterApprovalStatus;
  onboardingStatus: OnboardingStatus;
  provisioningStatus: AccountProvisioningStatus;
  walletAssignmentStatus: WalletAssignmentStatus;
  walletStatus?: WalletStatus;
};

export type AppGate =
  | 'loading'
  | 'unauthenticated'
  | 'onboarding_required'
  | 'compliance_review'
  | 'additional_information_required'
  | 'provisioning_pending'
  | 'wallet_pending'
  | 'ready';
