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
  contactAddress?: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: StakeholderRole;
};

export type AccountCapability = {
  enabled: boolean;
  key: string;
  label: string;
  reason?: string;
};

export type AccountSessionInfo = {
  deviceName?: string;
  ipAddressPlaceholder?: string;
  lastLoginAt?: string;
  sessionId: string;
};

export type ImporterAccount = {
  id: string;
  capabilities?: AccountCapability[];
  sessionInfo?: AccountSessionInfo;
  profile: ImporterProfile;
  provisioningStatus: AccountProvisioningStatus;
  wallet?: ImporterWallet;
};
