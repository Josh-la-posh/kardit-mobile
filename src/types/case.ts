export type SupportCaseStatus =
  'open' | 'additional_information_required' | 'in_review' | 'resolved' | 'closed';

export type SupportCaseType =
  'payment_issue' | 'card_issue' | 'wallet_issue' | 'document_issue' | 'account_issue' | 'other';

export type SupportCaseRelatedRecord = {
  id: string;
  label: string;
  type: 'card' | 'document' | 'payment' | 'transaction';
};

export type SupportCasePriority = 'low' | 'normal' | 'high';

export type SupportCaseEvidence = {
  fileName: string;
  id: string;
  uploadedAt?: string;
};

export type SupportCaseUpdate = {
  id: string;
  author: 'importer' | 'service_provider';
  createdAt: string;
  message: string;
  status?: SupportCaseStatus;
};

export type SupportCase = {
  id: string;
  accountId: string;
  createdAt: string;
  description: string;
  evidence?: SupportCaseEvidence[];
  informationRequest?: string;
  lastUpdatedAt: string;
  priority: SupportCasePriority;
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
  priority?: SupportCasePriority;
  relatedRecord?: SupportCaseRelatedRecord;
  title: string;
  type: SupportCaseType;
};
