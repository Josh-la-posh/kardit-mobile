import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { PaymentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'QrPayment'>;

export function QrPaymentScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="QR payment">
        <Text>
          PRD-ready placeholder for QR scan/upload, QR processing, invoice retrieval, supplier
          details, card selection, payment summary, authentication, and result states.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('QrScanUpload')}>Scan QR placeholder</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('QrScanUpload')}>
        Upload QR placeholder
      </Button>
    </Screen>
  );
}
