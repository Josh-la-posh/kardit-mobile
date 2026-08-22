import type {
  ImporterApplication,
  ImporterApplicationStatus,
  ImporterOnboardingDraft,
  ImporterOnboardingOptions,
} from '@/types/importerOnboarding';

const nowIso = () => new Date().toISOString();

const createMockId = () => `KDI-${Date.now().toString().slice(-8)}`;

const createReference = (applicationId: string) =>
  `REF-${applicationId.replace(/[^0-9]/g, '').slice(-6).padStart(6, '0')}`;

const createApplication = (
  draft: ImporterOnboardingDraft,
  applicationId = createMockId(),
  currentStep = 1,
): ImporterApplication => ({
  applicationId,
  currentStatus: draft.currentStatus ?? 'DRAFT',
  documents: draft.documents,
  progress: {
    canSubmit: currentStep >= 3,
    currentStep,
    currentStepKey: `step-${currentStep}`,
    route: currentStep >= 5 ? 'ApplicationStatus' : undefined,
    startedAt: nowIso(),
  },
  raw: {
    mock: true,
  },
  referenceNumber: draft.referenceNumber || createReference(applicationId),
  submittedAt: draft.submittedAt,
});

const delay = () => new Promise((resolve) => setTimeout(resolve, 350));

export const mockOnboardingApi = {
  createImporterApplication: async (draft: ImporterOnboardingDraft) => {
    await delay();
    return createApplication(draft, undefined, 1);
  },
  getApplicationStatus: async () => {
    await delay();
    return { nextStep: 'ApplicationStatus', status: 'UNDER_REVIEW' };
  },
  getImporterApplication: async (applicationId: string) => {
    await delay();
    return createApplication(
      {
        currentStatus: 'UNDER_REVIEW',
      } as ImporterOnboardingDraft,
      applicationId,
      5,
    );
  },
  getImporterApplicationOverview: async (applicationId: string) => {
    await delay();
    return { applicationId, mock: true };
  },
  getImporterOnboardingOptions: async (): Promise<ImporterOnboardingOptions> => {
    await delay();
    return {
      activities: ['Wholesale import', 'Retail distribution', 'Manufacturing inputs'],
      businessSectors: ['General commerce', 'Fashion', 'Healthcare', 'Agriculture'],
      categories: ['Consumer goods', 'Electronics', 'Textiles', 'Machinery'],
      expectedValues: ['Below NGN 5,000,000', 'NGN 5,000,000 - NGN 10,000,000', 'Above NGN 10,000,000'],
      frequencies: ['Weekly', 'Monthly', 'Quarterly'],
      roles: ['Owner', 'Director', 'Employee', 'Authorised Agent'],
    };
  },
  getOnboardingStatus: async () => {
    await delay();
    return { nextStep: 'ApplicationStatus', status: 'UNDER_REVIEW' as const };
  },
  saveApplicantDetails: async () => {
    await delay();
    return { saved: true };
  },
  submitApplication: async () => {
    await delay();
    return { submitted: true };
  },
  submitDocuments: async () => {
    await delay();
    return { submitted: true };
  },
  submitImporterApplication: async (applicationId: string, declarationAccepted: boolean) => {
    const currentStatus: ImporterApplicationStatus = declarationAccepted ? 'UNDER_REVIEW' : 'DRAFT';
    await delay();
    return {
      ...createApplication(
        {
          currentStatus,
        } as ImporterOnboardingDraft,
        applicationId,
        5,
      ),
      currentStatus,
      submittedAt: nowIso(),
    };
  },
  submitAdditionalInformation: async (
    applicationId: string,
    message: string,
    draft: ImporterOnboardingDraft,
  ) => {
    await delay();
    return {
      ...createApplication(draft, applicationId, 5),
      complianceReason: message,
      currentStatus: 'UNDER_REVIEW' as const,
      submittedAt: draft.submittedAt ?? nowIso(),
    };
  },
  updateImporterApplication: async (applicationId: string, draft: ImporterOnboardingDraft) => {
    await delay();
    return createApplication(draft, applicationId, 3);
  },
};
