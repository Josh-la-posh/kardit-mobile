import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import { importerBusinessRuleTodos } from '@/constants/businessRules';

export function DashboardScreen() {
  return (
    <Screen>
      <InfoCard title="Importer dashboard">
        <Text>
          Placeholder for application progress, active cards, funding alerts, and bank options.
        </Text>
      </InfoCard>
      <InfoCard title="Business rules to confirm">
        <Text>{importerBusinessRuleTodos.join('\n')}</Text>
      </InfoCard>
    </Screen>
  );
}
