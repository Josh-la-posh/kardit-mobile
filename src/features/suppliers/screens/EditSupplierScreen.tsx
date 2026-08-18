import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { SuppliersStackParamList } from '@/navigation/types';
import { mockSuppliers } from '@/utils/mockData';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'EditSupplier'>;

export function EditSupplierScreen({ navigation, route }: Props) {
  const supplier =
    mockSuppliers.find((item) => item.id === route.params.supplierId) ?? mockSuppliers[0];

  return (
    <Screen>
      <InfoCard title="Edit supplier">
        <Text>
          Placeholder edit form for {supplier.displayName}. Real update submission is pending.
        </Text>
      </InfoCard>
      <Input label="Supplier name" placeholder={supplier.displayName} />
      <Input label="Contact email" placeholder={supplier.contactEmail ?? 'accounts@example.com'} />
      <Button
        onPress={() => navigation.navigate('SupplierValidation', { supplierId: supplier.id })}
      >
        Save placeholder
      </Button>
    </Screen>
  );
}
