import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function AccountProvisioningPendingScreen() {
  return (
    <Screen>
      <InfoCard title="Account provisioning pending">
        <Text>
          Your importer application has been approved. Kardit is provisioning your business account.
        </Text>
      </InfoCard>
    </Screen>
  );
}
