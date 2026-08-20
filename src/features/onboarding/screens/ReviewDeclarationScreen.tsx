import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import {
  defaultImporterOnboardingDraft,
  saveImporterApplication,
} from '@/features/onboarding/importerOnboardingStorage';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ReviewDeclaration'>;

export function ReviewDeclarationScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Review" subtitle="Confirm your demo application details." />
      <StepIndicator current={4} total={5} />
      <InfoCard title="Review summary">
        <ListItem title="Business type" detail={defaultImporterOnboardingDraft.businessType} />
        <ListItem title="Applicant" detail={defaultImporterOnboardingDraft.fullName} />
        <ListItem title="Documents" detail="Pending upload" />
        <ListItem
          title="Validation"
          meta={`${validateImporterOnboardingStep(defaultImporterOnboardingDraft, 4).missing.length} demo issues until declaration is accepted`}
          detail="Local"
        />
      </InfoCard>
      <Button
        onPress={() => {
          void saveImporterApplication({
            applicationId: 'IMP-DEMO-APP-001',
            currentStatus: 'SUBMITTED',
            referenceNumber: 'KDT-IMP-ONB-001',
            submittedAt: new Date().toISOString(),
          });
          navigation.navigate('ApplicationStatus');
        }}
      >
        Submit demo application
      </Button>
    </Screen>
  );
}
