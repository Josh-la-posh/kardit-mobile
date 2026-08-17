import type { ImporterWallet } from './wallet';

export type StakeholderRole = 'importer' | 'affiliate';

export type AccountProvisioningStatus =
  | 'onboarding_required'
  | 'under_review'
  | 'additional_information_required'
  | 'approved'
  | 'provisioning'
  | 'wallet_assignment_pending'
  | 'ready'
  | 'rejected';

export type ImporterProfile = {
  accountId: string;
  businessName: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: StakeholderRole;
};

export type ImporterAccount = {
  id: string;
  profile: ImporterProfile;
  provisioningStatus: AccountProvisioningStatus;
  wallet?: ImporterWallet;
};
