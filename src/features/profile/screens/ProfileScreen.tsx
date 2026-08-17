import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function ProfileScreen() {
  return (
    <Screen>
      <InfoCard title="Profile and settings">
        <Text>
          Placeholder for importer organisation profile, user settings, and security controls.
        </Text>
      </InfoCard>
    </Screen>
  );
}
