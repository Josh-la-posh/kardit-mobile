import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function WalletAssignmentPendingScreen() {
  return (
    <Screen>
      <InfoCard title="Wallet assignment pending">
        <Text>
          Your business account is ready. Kardit is assigning your central wallet.
        </Text>
      </InfoCard>
    </Screen>
  );
}
