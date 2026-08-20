import type { ImporterDocumentKey, ImporterOnboardingDraft } from '@/types/importerOnboarding';

export const importerDocumentTypeMap: Record<ImporterDocumentKey, string> = {
  authorityToAct: 'AUTHORITY_TO_ACT',
  cacCertificate: 'CAC_CERTIFICATE',
  governmentId: 'APPLICANT_GOVERNMENT_ID',
  proofOfAddress: 'BUSINESS_ADDRESS_PROOF',
};

const roleRequiresAuthorityToAct = (role: ImporterOnboardingDraft['role']) =>
  role === 'Employee' || role === 'Authorised Agent';

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
      'addressLine1',
      'addressCountry',
      'addressState',
      'addressCity',
      'businessPhone',
      'businessEmail',
      'fullName',
      'role',
      'nin',
      'phone',
      'email',
    ].forEach((field) => {
      if (!draft[field as keyof ImporterOnboardingDraft]) missing.push(field);
    });

    if (!/^\d{11}$/.test(draft.nin)) missing.push('nin: 11 digits required');
  }

  if (step >= 2) {
    getRequiredImporterDocuments(draft).forEach((documentKey) => {
      if (!draft.documents[documentKey]) missing.push(documentKey);
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
