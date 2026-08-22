import type { ImporterDocumentKey, ImporterOnboardingDraft } from '@/types/importerOnboarding';

export const importerDocumentTypeMap: Record<ImporterDocumentKey, string> = {
  authorityToAct: 'AUTHORITY_TO_ACT',
  cacCertificate: 'CAC_CERTIFICATE',
  governmentId: 'APPLICANT_GOVERNMENT_ID',
  proofOfAddress: 'BUSINESS_ADDRESS_PROOF',
};

const roleRequiresAuthorityToAct = (role: ImporterOnboardingDraft['role']) =>
  role === 'Employee' || role === 'Authorised Agent';

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPhone = (value: string) => /^\+?[\d\s().-]{7,}$/.test(value);
const acceptedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];

export function getRequiredImporterDocuments(
  draft: ImporterOnboardingDraft,
): ImporterDocumentKey[] {
  const required: ImporterDocumentKey[] = ['cacCertificate', 'governmentId', 'proofOfAddress'];
  if (roleRequiresAuthorityToAct(draft.role)) {
    required.push('authorityToAct');
  }
  return required;
}

export function validateImporterOnboardingStep(
  draft: ImporterOnboardingDraft,
  step: 1 | 2 | 3 | 4,
) {
  const missing: string[] = [];

  if (step >= 1) {
    [
      'businessType',
      'cacNumber',
      'taxId',
      'legalBusinessName',
      'businessStatus',
      'businessPhone',
      'businessEmail',
      'addressLine1',
      'addressCountry',
      'addressState',
      'addressCity',
      'fullName',
      'role',
      'nin',
      'phone',
      'email',
    ].forEach((field) => {
      if (!draft[field as keyof ImporterOnboardingDraft]) missing.push(field);
    });

    if (!/^\d{11}$/.test(draft.nin)) missing.push('nin: 11 digits required');
    if (!validEmail(draft.businessEmail)) missing.push('businessEmail: invalid email');
    if (!validEmail(draft.email)) missing.push('email: invalid email');
    if (!validPhone(draft.businessPhone)) missing.push('businessPhone: invalid phone');
    if (!validPhone(draft.phone)) missing.push('phone: invalid phone');
  }

  if (step >= 2) {
    getRequiredImporterDocuments(draft).forEach((documentKey) => {
      const document = draft.documents[documentKey];
      if (!document) {
        missing.push(documentKey);
      } else {
        if (!acceptedMimeTypes.includes(document.mimeType)) missing.push(`${documentKey}: format`);
        if (document.sizeMb > 10) missing.push(`${documentKey}: 10MB maximum`);
        if (document.uploadProgress !== 100 && !document.serverUploaded) {
          missing.push(`${documentKey}: upload incomplete`);
        }
      }
    });
  }

  if (step >= 3) {
    if (!draft.businessSector) missing.push('businessSector');
    if (!draft.businessActivity) missing.push('businessActivity');
    if (!draft.importCategories.length) missing.push('importCategories');
    if (draft.importCategories.includes('Other') && !draft.otherImportCategory) {
      missing.push('otherImportCategory');
    }
    if (!draft.importFrequency) missing.push('importFrequency');
    if (!draft.expectedImportValue) missing.push('expectedImportValue');
  }

  if (step >= 4 && !draft.declarationAccepted) {
    missing.push('declarationAccepted');
  }

  return {
    missing,
    valid: missing.length === 0,
  };
}
