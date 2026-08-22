export type ImporterBusinessType = 'LLC' | 'RegisteredBusiness';

export type ImporterApplicantRole = 'Owner' | 'Director' | 'Employee' | 'Authorised Agent';

export type ImporterDocument = {
  fileName: string;
  mimeType: string;
  sizeMb: number;
  uri?: string;
  uploadProgress?: number;
  serverUploaded?: boolean;
  verificationStatus?: string;
  scanStatus?: string;
};

export type ImporterApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'ADDITIONAL_INFORMATION_REQUIRED';

export type ImporterDocumentKey =
  'cacCertificate' | 'governmentId' | 'proofOfAddress' | 'authorityToAct';

export type ImporterDocumentType =
  'CAC_CERTIFICATE' | 'APPLICANT_GOVERNMENT_ID' | 'BUSINESS_ADDRESS_PROOF' | 'AUTHORITY_TO_ACT';

export type ImporterOnboardingDraft = {
  addressCity: string;
  addressCountry: string;
  addressLine1: string;
  addressLine2?: string;
  addressState: string;
  businessActivity: string;
  businessEmail: string;
  businessPhone: string;
  businessSector: string;
  businessStatus: string;
  businessType: ImporterBusinessType;
  cacNumber: string;
  currentStatus?: ImporterApplicationStatus;
  declarationAccepted: boolean;
  documents: Partial<Record<ImporterDocumentKey, ImporterDocument>>;
  email: string;
  expectedImportValue: string;
  fullName: string;
  importCategories: string[];
  importFrequency: string;
  legalBusinessName: string;
  nin: string;
  otherImportCategory?: string;
  phone: string;
  referenceNumber?: string;
  rejectionReason?: string;
  role: ImporterApplicantRole;
  submittedAt?: string;
  taxId: string;
};

export type ImporterOnboardingOptions = {
  activities: string[];
  businessSectors: string[];
  categories: string[];
  expectedValues: string[];
  frequencies: string[];
  roles: ImporterApplicantRole[];
};

export type ImporterApplication = {
  applicationId: string;
  currentStatus?: ImporterApplicationStatus;
  progress?: {
    currentStep?: number;
    currentStepKey?: string;
    route?: string;
    canSubmit?: boolean;
    startedAt?: string;
  };
  documents?: ImporterOnboardingDraft['documents'];
  requestedItems?: string[];
  complianceReason?: string;
  raw?: unknown;
  referenceNumber?: string;
  rejectionReason?: string;
  submittedAt?: string;
};
