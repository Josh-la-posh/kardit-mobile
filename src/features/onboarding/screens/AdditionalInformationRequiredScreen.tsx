import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function AdditionalInformationRequiredScreen() {
  return (
    <Screen>
      <InfoCard title="Additional information required">
        <Text>
          PRD-ready placeholder for showing compliance feedback and the next onboarding step. Real
          document or response submission is pending backend contracts.
        </Text>
      </InfoCard>
    </Screen>
  );
}
