import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentSummary } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentSummary'>;

export function PaymentSummaryScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Payment summary">
        <Text>Supplier: {mockPaymentSummary.supplier.displayName}</Text>
        <Text>Amount: {mockPaymentSummary.amount.formatted}</Text>
        <Text>Funding source: {mockPaymentSummary.fundingSource.label}</Text>
        <Text>Documents required: {mockPaymentSummary.documentsRequired ? 'Yes' : 'No'}</Text>
      </InfoCard>
      <Button
        variant="secondary"
        onPress={() => navigation.getParent()?.navigate('Documents', { screen: 'UploadDocument' })}
      >
        Add required document placeholder
      </Button>
      <Button onPress={() => navigation.navigate('PaymentAuthentication')}>
        Continue to authentication placeholder
      </Button>
    </Screen>
  );
}
