import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ListItem } from '@/components/ui/ListItem';
import type { SuppliersStackParamList } from '@/navigation/types';
import { mockSuppliers } from '@/utils/mockData';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'SuppliersHome'>;

export function SuppliersScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Supplier beneficiaries"
        subtitle="Create and reuse demo supplier records for QR and bank-account payment flows."
      />
      <Button onPress={() => navigation.navigate('CreateSupplier')}>Create supplier</Button>
      {mockSuppliers.length === 0 ? (
        <EmptyState
          title="No suppliers yet"
          message="Saved supplier beneficiaries will appear here after supplier APIs are confirmed."
        />
      ) : (
        mockSuppliers.map((supplier) => (
          <ListItem
            key={supplier.id}
            title={supplier.displayName}
            meta={`${supplier.country} | ${supplier.bankAccount?.bankName ?? 'Bank pending'} | ${supplier.validationStatus}`}
            detail={supplier.defaultCurrency}
            onPress={() => navigation.navigate('SupplierDetails', { supplierId: supplier.id })}
          />
        ))
      )}
    </Screen>
  );
}
