export type SupportCaseStatus =
  'open' | 'additional_information_required' | 'in_review' | 'resolved' | 'closed';

export type SupportCaseType =
  'payment_issue' | 'card_issue' | 'wallet_issue' | 'document_issue' | 'account_issue' | 'other';

export type SupportCaseRelatedRecord = {
  id: string;
  label: string;
  type: 'card' | 'transaction';
};

export type SupportCaseUpdate = {
  id: string;
  author: 'importer' | 'service_provider';
  createdAt: string;
  message: string;
};

export type SupportCase = {
  id: string;
  accountId: string;
  createdAt: string;
  description: string;
  reference: string;
  relatedRecord?: SupportCaseRelatedRecord;
  status: SupportCaseStatus;
  title: string;
  type: SupportCaseType;
  updates: SupportCaseUpdate[];
};

export type CreateSupportCaseRequest = {
  attachmentIds?: string[];
  description: string;
  relatedRecord?: SupportCaseRelatedRecord;
  title: string;
  type: SupportCaseType;
};
