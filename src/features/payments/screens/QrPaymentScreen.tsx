import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';

export function QrPaymentScreen() {
  return (
    <Screen>
      <InfoCard title="QR payment">
        <Text>
          PRD-ready placeholder for QR scan/upload, QR processing, invoice retrieval, supplier
          details, card selection, payment summary, authentication, and result states.
        </Text>
      </InfoCard>
      <Button>Scan QR placeholder</Button>
      <Button variant="secondary">Upload QR placeholder</Button>
    </Screen>
  );
}
