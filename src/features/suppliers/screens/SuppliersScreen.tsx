import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { mockSuppliers } from '@/utils/mockData';

export function SuppliersScreen() {
  return (
    <Screen>
      <InfoCard title="Supplier beneficiaries">
        <Text>
          PRD-ready placeholder for creating, viewing, editing, and reusing supplier beneficiary
          records during payment initiation.
        </Text>
      </InfoCard>
      {mockSuppliers.length === 0 ? (
        <EmptyState
          title="No suppliers yet"
          message="Saved supplier beneficiaries will appear here after supplier APIs are confirmed."
        />
      ) : (
        <InfoCard title={mockSuppliers[0].displayName}>
          <Text>{mockSuppliers[0].bankAccount?.bankName}</Text>
        </InfoCard>
      )}
    </Screen>
  );
}
