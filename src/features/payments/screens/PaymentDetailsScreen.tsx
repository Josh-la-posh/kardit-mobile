import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockSuppliers } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentDetails'>;

export function PaymentDetailsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Payment details">
        <Text>Supplier placeholder: {mockSuppliers[0].displayName}</Text>
        <Text>Provider choice remains hidden; Kardit Core determines the route.</Text>
      </InfoCard>
      <Input label="Amount" placeholder="0.00" keyboardType="numeric" />
      <Input label="Purpose" placeholder="Supplier invoice payment" />
      <Button onPress={() => navigation.navigate('FundingSourceSelection')}>
        Select funding source
      </Button>
    </Screen>
  );
}
