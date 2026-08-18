export type ComplianceDocumentType =
  | 'invoice'
  | 'purchase_order'
  | 'shipping_document'
  | 'identity_document'
  | 'business_registration'
  | 'other';

export type ComplianceDocumentStatus = 'pending_upload' | 'uploaded' | 'validated' | 'rejected';

export type ComplianceDocument = {
  expiresAt?: string;
  id: string;
  fileName: string;
  linkedPaymentId?: string;
  mimeType: string;
  rejectionReason?: string;
  required: boolean;
  status: ComplianceDocumentStatus;
  transactionId?: string;
  type: ComplianceDocumentType;
  uploadedAt?: string;
};

export type ComplianceDocumentRequirement = {
  documentType: ComplianceDocumentType;
  required: boolean;
  ruleSource: 'core_placeholder';
};

export type DocumentUploadRequest = {
  fileName: string;
  mimeType: string;
  paymentId?: string;
  required?: boolean;
  transactionId?: string;
  type: ComplianceDocumentType;
  uri: string;
};
