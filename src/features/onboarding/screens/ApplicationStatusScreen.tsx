import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import { complianceStatuses } from '@/constants/businessRules';

export function ApplicationStatusScreen() {
  return (
    <Screen>
      <InfoCard title="Under Compliance Review">
        <Text>
          PRD-ready placeholder for onboarding and compliance review status. Known statuses:{' '}
          {complianceStatuses.join(', ')}.
        </Text>
      </InfoCard>
    </Screen>
  );
}
