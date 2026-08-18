import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { SuppliersStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'CreateSupplier'>;

export function CreateSupplierScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Create supplier">
        <Text>
          PRD-ready placeholder for saving reusable supplier beneficiary details. Real validation is
          pending backend contracts.
        </Text>
      </InfoCard>
      <Input label="Supplier name" placeholder="Supplier business name" />
      <Input label="Country" placeholder="China" />
      <Input label="Bank account" placeholder="Account number" keyboardType="numeric" />
      <Select label="Currency" placeholder="Select currency" />
      <Button onPress={() => navigation.navigate('SupplierValidation', {})}>
        Validate supplier placeholder
      </Button>
    </Screen>
  );
}
