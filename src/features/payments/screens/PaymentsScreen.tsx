import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { PaymentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentsHome'>;

export function PaymentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Supplier payments">
        <Text>
          PRD-ready placeholder for payment initiation. Kardit Core will determine the underlying
          rail; providers are not exposed as user choices.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('QrPayment')}>QR payment</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('BankAccountPayment')}>
        Bank account payment
      </Button>
    </Screen>
  );
}
