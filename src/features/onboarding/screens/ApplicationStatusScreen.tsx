import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { complianceStatuses } from '@/constants/businessRules';
import { defaultImporterOnboardingDraft } from '@/features/onboarding/importerOnboardingStorage';

export function ApplicationStatusScreen() {
  return (
    <Screen>
      <AppHeader title="Application status" subtitle="Track your importer application review." />
      <StepIndicator current={5} total={5} />
      <InfoCard title="Under review">
        <ListItem title="Application ID" detail="IMP-DEMO-APP-001" />
        <ListItem
          title="Submitted at"
          detail={defaultImporterOnboardingDraft.submittedAt ?? 'Demo timestamp'}
        />
        <ListItem title="Current status" detail="SUBMITTED" />
        <ListItem title="Possible statuses" meta={complianceStatuses.join(', ')} />
      </InfoCard>
      <InfoCard title="Tracking">
        <ListItem
          title="Track application"
          meta="Real status refetch will call GET /api/v1/importers/onboarding/applications/{applicationId}."
          detail="Demo"
        />
      </InfoCard>
    </Screen>
  );
}
