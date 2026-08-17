export type ComplianceDocumentType =
  | 'invoice'
  | 'purchase_order'
  | 'shipping_document'
  | 'identity_document'
  | 'business_registration'
  | 'other';

export type ComplianceDocumentStatus = 'pending_upload' | 'uploaded' | 'validated' | 'rejected';

export type ComplianceDocument = {
  id: string;
  fileName: string;
  mimeType: string;
  status: ComplianceDocumentStatus;
  transactionId?: string;
  type: ComplianceDocumentType;
  uploadedAt?: string;
};

export type DocumentUploadRequest = {
  fileName: string;
  mimeType: string;
  transactionId?: string;
  type: ComplianceDocumentType;
  uri: string;
};
