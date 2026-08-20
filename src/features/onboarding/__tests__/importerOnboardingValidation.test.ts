import {
  getRequiredImporterDocuments,
  validateImporterOnboardingStep,
} from '@/features/onboarding/importerOnboardingValidation';
import { defaultImporterOnboardingDraft } from '@/features/onboarding/importerOnboardingStorage';

describe('importer onboarding validation', () => {
  it('requires authority to act for employee and authorised agent roles', () => {
    expect(
      getRequiredImporterDocuments({ ...defaultImporterOnboardingDraft, role: 'Employee' }),
    ).toContain('authorityToAct');
    expect(getRequiredImporterDocuments(defaultImporterOnboardingDraft)).not.toContain(
      'authorityToAct',
    );
  });

  it('validates NIN as exactly 11 digits', () => {
    const result = validateImporterOnboardingStep(
      { ...defaultImporterOnboardingDraft, nin: '123ABC' },
      1,
    );

    expect(result.valid).toBe(false);
    expect(result.missing).toContain('nin: 11 digits required');
  });

  it('requires declaration on review step', () => {
    const result = validateImporterOnboardingStep(defaultImporterOnboardingDraft, 4);

    expect(result.valid).toBe(false);
    expect(result.missing).toContain('declarationAccepted');
  });
});
