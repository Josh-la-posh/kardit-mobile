import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ApplicantInformation'>;

export function ApplicantInformationScreen({ navigation }: Props) {
  const {
    draft,
    error,
    loading,
    options,
    optionsError,
    optionsLoading,
    saveStep,
    updateDraft,
  } = useImporterOnboarding();
  const validation = validateImporterOnboardingStep(draft, 1);

  return (
    <Screen>
      <AppHeader
        title="Organisation details"
        subtitle="Add the importer and representative information."
      />
      <StepIndicator current={1} total={5} />
      <Input label="Business type" value={draft.businessType} onChangeText={(value) => updateDraft({ businessType: value as typeof draft.businessType })} />
      <Input label="CAC / RC / BN number" value={draft.cacNumber} onChangeText={(cacNumber) => updateDraft({ cacNumber })} />
      <Input label="Tax ID" value={draft.taxId} onChangeText={(taxId) => updateDraft({ taxId })} />
      <Input label="Legal business name" value={draft.legalBusinessName} onChangeText={(legalBusinessName) => updateDraft({ legalBusinessName })} />
      <Input label="Business status" value={draft.businessStatus} onChangeText={(businessStatus) => updateDraft({ businessStatus })} />
      <Input label="Business phone number" value={draft.businessPhone} onChangeText={(businessPhone) => updateDraft({ businessPhone })} keyboardType="phone-pad" />
      <Input label="Business email" value={draft.businessEmail} onChangeText={(businessEmail) => updateDraft({ businessEmail })} keyboardType="email-address" />
      <Input label="Address line 1" value={draft.addressLine1} onChangeText={(addressLine1) => updateDraft({ addressLine1 })} />
      <Input label="Address line 2" value={draft.addressLine2} onChangeText={(addressLine2) => updateDraft({ addressLine2 })} />
      <Input label="Country" value={draft.addressCountry} onChangeText={(addressCountry) => updateDraft({ addressCountry, addressState: '', addressCity: '' })} />
      <Input label="State" value={draft.addressState} onChangeText={(addressState) => updateDraft({ addressState, addressCity: '' })} />
      <Input label="City / LGA" value={draft.addressCity} onChangeText={(addressCity) => updateDraft({ addressCity })} />
      <Input label="Full name" value={draft.fullName} onChangeText={(fullName) => updateDraft({ fullName })} />
      <ListItem
        title="Role"
        meta={
          optionsLoading
            ? 'Loading roles...'
            : options?.roles?.length
              ? 'Select the representative role below'
              : optionsError || 'No roles returned by backend'
        }
        detail={draft.role || 'Required'}
      />
      {options?.roles?.map((role) => (
        <ListItem
          key={role}
          title={role}
          detail={draft.role === role ? 'Selected' : 'Select'}
          onPress={() => updateDraft({ role })}
        />
      ))}
      <Input label="NIN" value={draft.nin} onChangeText={(nin) => updateDraft({ nin: nin.replace(/\D/g, '').slice(0, 11) })} keyboardType="number-pad" />
      <Input label="Phone number" value={draft.phone} onChangeText={(phone) => updateDraft({ phone })} keyboardType="phone-pad" />
      <Input label="Email address" value={draft.email} onChangeText={(email) => updateDraft({ email })} keyboardType="email-address" />
      <ListItem
        title="Validation"
        meta={`${validation.missing.length} required items remaining`}
        detail={validation.valid ? 'Ready' : 'Required'}
      />
      {error ? <ListItem title="Save failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || !validation.valid}
        onPress={() => void saveStep(1).then((saved) => saved && navigation.navigate('DocumentSubmission'))}
      >
        {loading ? 'Saving...' : 'Save and continue'}
      </Button>
    </Screen>
  );
}
