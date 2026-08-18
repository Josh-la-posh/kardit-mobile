import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { getQrRouteDecisionPlaceholder } from '@/features/payments/paymentRouting';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockQrProcessingResult } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'QrScanUpload'>;

export function QrScanUploadScreen({ navigation }: Props) {
  const decision = getQrRouteDecisionPlaceholder(mockQrProcessingResult);

  return (
    <Screen>
      <InfoCard title="Scan or upload QR">
        <Text>
          Placeholder only. Camera permissions, image upload, QR parsing, and invoice retrieval are
          pending.
        </Text>
        <Text>{decision.message}</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('PaymentDetails')}>
        Continue with QR details
      </Button>
      <Button variant="secondary" onPress={() => navigation.navigate('BankAccountPayment')}>
        Route to bank-account payment
      </Button>
    </Screen>
  );
}
