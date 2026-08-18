import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { SuppliersStackParamList } from '@/navigation/types';
import { mockSuppliers } from '@/utils/mockData';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'SupplierDetails'>;

export function SupplierDetailsScreen({ navigation, route }: Props) {
  const supplier =
    mockSuppliers.find((item) => item.id === route.params.supplierId) ?? mockSuppliers[0];

  return (
    <Screen>
      <InfoCard title={supplier.displayName}>
        <Text>Country: {supplier.country}</Text>
        <Text>Currency: {supplier.defaultCurrency}</Text>
        <Text>Reusable beneficiary: {supplier.reusable ? 'Yes' : 'No'}</Text>
        <Text>Validation status: {supplier.validationStatus}</Text>
      </InfoCard>
      <InfoCard title="Bank details">
        <Text>Bank: {supplier.bankAccount?.bankName}</Text>
        <Text>Account name: {supplier.bankAccount?.accountName}</Text>
        <Text>Account number: {supplier.bankAccount?.accountNumber}</Text>
      </InfoCard>
      <InfoCard title="Contact">
        <Text>Email: {supplier.contactEmail ?? 'Not provided'}</Text>
        <Text>Phone: {supplier.contactPhone ?? 'Not provided'}</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('EditSupplier', { supplierId: supplier.id })}>
        Edit supplier
      </Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('SupplierValidation', { supplierId: supplier.id })}
      >
        Validate details placeholder
      </Button>
    </Screen>
  );
}
