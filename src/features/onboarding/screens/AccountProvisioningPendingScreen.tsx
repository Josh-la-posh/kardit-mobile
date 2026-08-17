import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function AccountProvisioningPendingScreen() {
  return (
    <Screen>
      <InfoCard title="Account provisioning pending">
        <Text>
          PRD-ready placeholder for approved importers whose Kardit Business account is still being
          provisioned by Kardit Core.
        </Text>
      </InfoCard>
    </Screen>
  );
}
