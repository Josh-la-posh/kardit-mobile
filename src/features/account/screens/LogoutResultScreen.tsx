import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function LogoutResultScreen() {
  return (
    <Screen>
      <InfoCard title="Logged out placeholder">
        <Text>
          Post-logout state placeholder. Real token clearing and session revocation are handled by
          auth integration in a later phase.
        </Text>
      </InfoCard>
    </Screen>
  );
}
