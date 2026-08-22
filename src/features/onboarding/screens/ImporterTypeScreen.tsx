import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { Select } from '@/components/ui/Select';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { clearImporterOnboarding, persistImporterStakeholderType } from '@/features/onboarding/importerOnboardingStorage';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ImporterType'>;

export function ImporterTypeScreen({ navigation }: Props) {
  const [applicationId, setApplicationId] = useState('');
  const { error, loading, lookupApplication, startNewApplication } = useImporterOnboarding();

  const openStep = (step: number) => {
    const screen = ['ImporterType', 'ApplicantInformation', 'DocumentSubmission', 'BusinessProfile', 'ReviewDeclaration', 'ApplicationStatus'][step] as keyof OnboardingStackParamList;
    navigation.navigate(screen);
  };

  return (
    <Screen>
      <AppHeader
        eyebrow="Onboarding demo"
        title="Business type"
        subtitle="Choose how your importer business is registered."
      />
      <StepIndicator current={1} total={5} />
      <InfoCard title="Applicant type">
        <ListItem
          title="Rule pending"
          meta="Requirements may vary for LLC or registered business."
          detail="Demo"
        />
      </InfoCard>
      <Select label="Importer type" value="Importer" placeholder="Select importer type" />
      <Button
        onPress={() => void clearImporterOnboarding().then(persistImporterStakeholderType).then(() => startNewApplication()).then(() => navigation.navigate('ApplicantInformation'))}
      >
        Start new application
      </Button>
      <InfoCard title="Existing application">
        <Input label="Application ID" value={applicationId} onChangeText={setApplicationId} autoCapitalize="none" />
        <Button
          disabled={loading || !applicationId.trim()}
          variant="secondary"
          onPress={() => void lookupApplication(applicationId).then((step) => step && openStep(step))}
        >
          Continue application
        </Button>
        <Button
          disabled={loading || !applicationId.trim()}
          variant="ghost"
          onPress={() => void lookupApplication(applicationId, true).then((step) => step && openStep(step))}
        >
          Track application
        </Button>
        {error ? <ListItem title="Lookup failed" meta={error} detail="Retry" /> : null}
      </InfoCard>
    </Screen>
  );
}
