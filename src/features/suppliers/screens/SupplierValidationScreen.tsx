import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { SuppliersStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SuppliersStackParamList, 'SupplierValidation'>;

export function SupplierValidationScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Supplier validation status">
        <Text>
          Placeholder validation result. Real supplier bank validation, sanctions/compliance checks,
          and status updates are pending Kardit Core contracts.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('SuppliersHome')}>Done</Button>
    </Screen>
  );
}
