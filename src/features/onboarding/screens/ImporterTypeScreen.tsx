import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { clearImporterOnboarding, persistImporterStakeholderType } from '@/features/onboarding/importerOnboardingStorage';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ImporterType'>;

export function ImporterTypeScreen({ navigation }: Props) {
  const [applicationId, setApplicationId] = useState('');
  const [applicationIdError, setApplicationIdError] = useState('');
  const { error, loading, lookupApplication, startNewApplication } = useImporterOnboarding();

  const openStep = (step: number) => {
    const screen = ['ImporterType', 'ApplicantInformation', 'DocumentSubmission', 'BusinessProfile', 'ReviewDeclaration', 'ApplicationStatus'][step] as keyof OnboardingStackParamList;
    navigation.navigate(screen);
  };

  const startApplication = () =>
    void clearImporterOnboarding()
      .then(persistImporterStakeholderType)
      .then(() => startNewApplication())
      .then(() => navigation.navigate('ApplicantInformation'));

  const lookupExistingApplication = (trackOnly: boolean) => {
    const trimmedApplicationId = applicationId.trim();
    if (!trimmedApplicationId) {
      setApplicationIdError('Enter an application ID to continue.');
      return;
    }

    setApplicationIdError('');
    void lookupApplication(trimmedApplicationId, trackOnly).then((step) => step && openStep(step));
  };

  return (
    <Screen>
      <AppHeader title="Sign up" subtitle="Start importer registration" />
      <Button onPress={startApplication}>
        Start new application
      </Button>
      <InfoCard title="Existing application">
        <Input
          label="Application ID"
          value={applicationId}
          onChangeText={(value) => {
            setApplicationId(value);
            if (applicationIdError) setApplicationIdError('');
          }}
          autoCapitalize="characters"
          error={applicationIdError}
        />
        <Button
          disabled={loading}
          variant="secondary"
          onPress={() => lookupExistingApplication(false)}
        >
          Continue application
        </Button>
        <Button
          disabled={loading}
          variant="ghost"
          onPress={() => lookupExistingApplication(true)}
        >
          Track application
        </Button>
        {error ? <ListItem title="Lookup failed" meta={error} detail="Retry" /> : null}
      </InfoCard>
    </Screen>
  );
}
