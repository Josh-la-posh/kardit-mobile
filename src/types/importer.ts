export type ComplianceStatus =
  'Under Compliance Review' | 'Additional Information Required' | 'Approved';

export type CardType = 'virtual' | 'physical';

export type ImporterCard = {
  id: string;
  label: string;
  type: CardType;
  bankName: string;
  status: 'active' | 'pending' | 'frozen';
  balance: string;
};

export type IssuingBank = {
  id: string;
  name: string;
  supportedCardTypes: CardType[];
};
