import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { complianceStatuses } from '@/constants/businessRules';

export function ApplicationStatusScreen() {
  return (
    <Screen>
      <AppHeader title="Application status" subtitle="Track your importer application review." />
      <StepIndicator current={6} total={6} />
      <InfoCard title="Under review">
        <ListItem title="Current status" detail="Compliance review" />
        <ListItem title="Possible statuses" meta={complianceStatuses.join(', ')} />
      </InfoCard>
    </Screen>
  );
}
