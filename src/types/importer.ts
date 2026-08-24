export type ComplianceStatus =
  'Under Compliance Review' | 'Additional Information Required' | 'Approved';

export type CardType = 'virtual' | 'physical';
export type CardStatus = 'active' | 'pending' | 'frozen' | 'terminated';

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
  status: CardStatus;
  balance: string;
  maskedNumber?: string;
  holderName?: string;
  expiry?: string;
  capabilities?: CardCapability[];
};

export type CardTransaction = {
  id: string;
  amount: string;
  createdAt: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
};

export type VirtualCardSensitiveDetails = {
  cvvPlaceholder: string;
  expiryPlaceholder: string;
  panPlaceholder: string;
};

export type CardRequestStatus = 'draft' | 'submitted' | 'processing' | 'approved' | 'failed';

export type CardRequest = {
  cardType: CardType;
  issuingBankId: string;
  requestId?: string;
};

export type CardRequestResult = {
  reference: string;
  status: CardRequestStatus;
};

export type IssuingBank = {
  id: string;
  name: string;
  supportedCardTypes: CardType[];
};
