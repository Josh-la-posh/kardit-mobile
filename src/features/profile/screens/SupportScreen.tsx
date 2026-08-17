import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';

export function SupportScreen() {
  return (
    <Screen>
      <InfoCard title="Support and help">
        <Text>Placeholder for importer help topics, ticket creation, and contact options.</Text>
      </InfoCard>
    </Screen>
  );
}
