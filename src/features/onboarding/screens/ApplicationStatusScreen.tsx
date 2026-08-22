import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ApplicationStatus'>;

export function ApplicationStatusScreen({ navigation }: Props) {
  const { application, applicationId, draft, error, loading, refreshStatus, startNewApplication } = useImporterOnboarding();
  const status = application?.currentStatus ?? draft.currentStatus ?? 'DRAFT';
  const isTerminal = status === 'APPROVED' || status === 'REJECTED';

  return (
    <Screen>
      <AppHeader title="Application status" subtitle="Track your importer application review." />
      <StepIndicator current={5} total={5} />
      <InfoCard title={status.replaceAll('_', ' ')}>
        <ListItem title="Application ID" detail={applicationId ?? 'Not created'} />
        {application?.referenceNumber ? <ListItem title="Reference number" detail={application.referenceNumber} /> : null}
        <ListItem
          title="Submitted at"
          detail={application?.submittedAt ?? draft.submittedAt ?? 'Not submitted'}
        />
        <ListItem title="Current status" detail={status} />
        {application?.progress?.currentStep ? <ListItem title="Draft progress" detail={`Step ${application.progress.currentStep} of 5`} /> : null}
        {application?.rejectionReason ? <ListItem title="Rejection reason" detail={application.rejectionReason} /> : null}
        {application?.complianceReason ? <ListItem title="Compliance request" detail={application.complianceReason} /> : null}
        {application?.requestedItems?.length ? <ListItem title="Requested items" detail={application.requestedItems.join(', ')} /> : null}
      </InfoCard>
      <InfoCard title="Tracking">
        <ListItem title="Refetch application status" detail={loading ? 'Loading...' : 'Refresh'} onPress={() => void refreshStatus()} />
        {error ? <ListItem title="Refresh failed" meta={error} detail="Retry" /> : null}
      </InfoCard>
      {status === 'DRAFT' ? <Button onPress={() => navigation.navigate('ApplicantInformation')}>Complete your draft</Button> : null}
      {status === 'ADDITIONAL_INFORMATION_REQUIRED' ? <Button onPress={() => navigation.navigate('AdditionalInformationRequired')}>Update information</Button> : null}
      {isTerminal ? <Button variant="secondary" onPress={() => void startNewApplication().then(() => navigation.navigate('ImporterType'))}>Start new application</Button> : null}
    </Screen>
  );
}
