import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Switch } from 'react-native';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ReviewDeclaration'>;

export function ReviewDeclarationScreen({ navigation }: Props) {
  const { draft, error, loading, submit, updateDraft } = useImporterOnboarding();
  const validation = validateImporterOnboardingStep(draft, 4);

  return (
    <Screen>
      <AppHeader title="Review and declaration" subtitle="Confirm your application before submission." />
      <StepIndicator current={4} total={5} />
      <InfoCard title="Review summary">
        <ListItem title="Business type" detail={draft.businessType} onPress={() => navigation.navigate('ApplicantInformation')} />
        <ListItem title="Applicant" detail={draft.fullName} onPress={() => navigation.navigate('ApplicantInformation')} />
        <ListItem title="Documents" detail={`${Object.keys(draft.documents).length} uploaded`} onPress={() => navigation.navigate('DocumentSubmission')} />
        <ListItem title="Import profile" detail={draft.businessSector} onPress={() => navigation.navigate('BusinessProfile')} />
        <ListItem
          title="Validation"
          meta={`${validation.missing.length} required items remaining`}
          detail="Local"
        />
      </InfoCard>
      <InfoCard title="Declaration">
        <ListItem title="I declare that the information provided is true, accurate, and submitted by an authorised representative of this business." detail={draft.declarationAccepted ? 'Accepted' : 'Required'} />
        <Switch value={draft.declarationAccepted} onValueChange={(declarationAccepted) => updateDraft({ declarationAccepted })} />
      </InfoCard>
      {error ? <ListItem title="Submission failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || !validation.valid}
        onPress={() => void submit().then((submitted) => submitted && navigation.navigate('ApplicationStatus'))}
      >
        {loading ? 'Submitting...' : 'Submit application'}
      </Button>
    </Screen>
  );
}
