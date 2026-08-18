import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { providerChoiceHiddenNote } from '@/features/payments/paymentRouting';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentRoutes } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentsHome'>;

export function PaymentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Supplier payments">
        <Text>
          PRD-ready placeholder for payment initiation. Kardit Core will determine the underlying
          rail; providers are not exposed as user choices.
        </Text>
        <Text>{providerChoiceHiddenNote}</Text>
      </InfoCard>
      <InfoCard title="Payment routes">
        {mockPaymentRoutes.map((route) => (
          <Text key={route.route}>
            {route.label}: {route.description}
          </Text>
        ))}
      </InfoCard>
      <Button onPress={() => navigation.navigate('QrPayment')}>QR payment</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('BankAccountPayment')}>
        Bank account payment
      </Button>
    </Screen>
  );
}
