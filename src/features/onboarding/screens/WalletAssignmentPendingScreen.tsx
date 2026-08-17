import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function WalletAssignmentPendingScreen() {
  return (
    <Screen>
      <InfoCard title="Wallet assignment pending">
        <Text>
          PRD-ready placeholder for approved and provisioned importers waiting for central wallet
          assignment before wallet-dependent capabilities become available.
        </Text>
      </InfoCard>
    </Screen>
  );
}
