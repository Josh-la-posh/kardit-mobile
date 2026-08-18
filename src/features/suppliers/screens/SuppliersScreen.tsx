import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { SuppliersStackParamList } from '@/navigation/types';
import { mockSuppliers } from '@/utils/mockData';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'SuppliersHome'>;

export function SuppliersScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Supplier beneficiaries">
        <Text>
          PRD-ready placeholder for creating, viewing, editing, and reusing supplier beneficiary
          records during payment initiation.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CreateSupplier')}>Create supplier</Button>
      {mockSuppliers.length === 0 ? (
        <EmptyState
          title="No suppliers yet"
          message="Saved supplier beneficiaries will appear here after supplier APIs are confirmed."
        />
      ) : (
        mockSuppliers.map((supplier) => (
          <InfoCard key={supplier.id} title={supplier.displayName}>
            <Text>{supplier.country}</Text>
            <Text>{supplier.bankAccount?.bankName}</Text>
            <Text>Status: {supplier.validationStatus}</Text>
            <Button
              variant="secondary"
              onPress={() => navigation.navigate('SupplierDetails', { supplierId: supplier.id })}
            >
              View supplier
            </Button>
          </InfoCard>
        ))
      )}
    </Screen>
  );
}
