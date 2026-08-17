import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { mockAccount } from '@/utils/mockData';

export function AccountDetailsScreen() {
  return (
    <Screen>
      <InfoCard title="Account details">
        <Text>
          PRD-ready placeholder for authenticated importer account information, stakeholder role,
          provisioning status, and wallet readiness.
        </Text>
      </InfoCard>
      <InfoCard title={mockAccount.profile.businessName}>
        <Text>{mockAccount.profile.email}</Text>
      </InfoCard>
      <Button variant="secondary">Logout confirmation placeholder</Button>
    </Screen>
  );
}
