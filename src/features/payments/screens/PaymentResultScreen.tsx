import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentResult } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentResult'>;

export function PaymentResultScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Payment status">
        <Text>Reference: {mockPaymentResult.reference}</Text>
        <Text>Status: {mockPaymentResult.status}</Text>
        <Text>Real submission and status polling are pending Kardit Core contracts.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('PaymentsHome')}>Done</Button>
    </Screen>
  );
}
