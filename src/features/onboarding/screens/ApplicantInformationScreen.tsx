import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import {
  defaultImporterOnboardingDraft,
  saveImporterOnboardingDraft,
} from '@/features/onboarding/importerOnboardingStorage';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ApplicantInformation'>;

export function ApplicantInformationScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Organisation details"
        subtitle="Add the importer and representative information."
      />
      <StepIndicator current={1} total={5} />
      <Input label="Legal business name" placeholder="Registered business name" />
      <Input label="CAC / RC / BN number" placeholder="BN-000000" />
      <Input label="Tax ID" placeholder="TIN-000000" />
      <Input label="Applicant name" placeholder="Representative legal name" />
      <Input label="NIN" placeholder="11 digits" keyboardType="number-pad" />
      <Input label="Phone number" placeholder="+234..." keyboardType="phone-pad" />
      <ListItem
        title="Validation"
        meta={`${validateImporterOnboardingStep(defaultImporterOnboardingDraft, 1).missing.length} demo issues`}
        detail="Local"
      />
      <Button
        onPress={() => {
          void saveImporterOnboardingDraft(defaultImporterOnboardingDraft);
          navigation.navigate('DocumentSubmission');
        }}
      >
        Continue
      </Button>
    </Screen>
  );
}
