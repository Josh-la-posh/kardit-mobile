export type ComplianceStatus =
  'Under Compliance Review' | 'Additional Information Required' | 'Approved';

export type CardType = 'virtual' | 'physical';

export type CardOperation =
  'activate' | 'freeze' | 'unfreeze' | 'terminate' | 'reset_pin' | 'fund' | 'view_transactions';

export type CardCapability = {
  operation: CardOperation;
  permitted: boolean;
  reason?: string;
};

export type ImporterCard = {
  id: string;
  label: string;
  type: CardType;
  bankName: string;
  status: 'active' | 'pending' | 'frozen';
  balance: string;
  capabilities?: CardCapability[];
};

export type IssuingBank = {
  id: string;
  name: string;
  supportedCardTypes: CardType[];
};
