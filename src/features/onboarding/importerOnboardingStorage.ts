import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ImporterApplication, ImporterOnboardingDraft } from '@/types/importerOnboarding';

export const importerOnboardingStorageKeys = {
  applicationId: 'kardit.importerOnboarding.applicationId.v1',
  draft: 'kardit.importerOnboarding.draft.v1',
  stakeholderType: 'kardit.onboarding.stakeholderType.v1',
};

export const defaultImporterOnboardingDraft: ImporterOnboardingDraft = {
  addressCity: 'Lagos',
  addressCountry: 'Nigeria',
  addressLine1: '12 Trade Avenue',
  addressState: 'Lagos',
  businessActivity: 'Wholesale import',
  businessEmail: 'trade@sampleimporter.example',
  businessPhone: '+234 800 000 0000',
  businessSector: 'General commerce',
  businessStatus: 'Active',
  businessType: 'RegisteredBusiness',
  cacNumber: 'BN-000000',
  currentStatus: 'DRAFT',
  declarationAccepted: false,
  documents: {},
  email: 'joshua@example.com',
  expectedImportValue: 'NGN 5,000,000 - NGN 10,000,000',
  fullName: 'Joshua Importer',
  importCategories: ['Consumer goods'],
  importFrequency: 'Monthly',
  legalBusinessName: 'Sample Importer Ltd.',
  nin: '12345678901',
  phone: '+234 800 000 1111',
  role: 'Owner',
  taxId: 'TIN-000000',
};

export async function loadImporterOnboardingDraft() {
  const stored = await AsyncStorage.getItem(importerOnboardingStorageKeys.draft);
  if (!stored) return defaultImporterOnboardingDraft;

  return {
    ...defaultImporterOnboardingDraft,
    ...(JSON.parse(stored) as Partial<ImporterOnboardingDraft>),
  };
}

export async function saveImporterOnboardingDraft(draft: ImporterOnboardingDraft) {
  await AsyncStorage.setItem(importerOnboardingStorageKeys.draft, JSON.stringify(draft));
}

export async function saveImporterApplication(application: ImporterApplication) {
  await AsyncStorage.setItem(
    importerOnboardingStorageKeys.applicationId,
    application.applicationId,
  );
  await saveImporterOnboardingDraft({
    ...defaultImporterOnboardingDraft,
    currentStatus: application.currentStatus ?? 'SUBMITTED',
    referenceNumber: application.referenceNumber,
    rejectionReason: application.rejectionReason,
    submittedAt: application.submittedAt,
  });
}

export async function persistImporterStakeholderType() {
  await AsyncStorage.setItem(importerOnboardingStorageKeys.stakeholderType, 'Importer');
}
