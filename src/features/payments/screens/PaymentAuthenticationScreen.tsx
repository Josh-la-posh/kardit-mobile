import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import type { PaymentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentAuthentication'>;

export function PaymentAuthenticationScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Payment authentication">
        <Text>
          Placeholder authentication step. Real OTP, PIN, biometric, or challenge flow is pending
          backend confirmation.
        </Text>
      </InfoCard>
      <Input label="Placeholder code" placeholder="000000" keyboardType="numeric" />
      <Button onPress={() => navigation.navigate('PaymentResult')}>Confirm placeholder</Button>
    </Screen>
  );
}
