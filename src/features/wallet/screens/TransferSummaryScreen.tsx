import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';
import { mockTransferSummary } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'TransferSummary'>;

export function TransferSummaryScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Transfer summary">
        <Text>Source: {mockTransferSummary.source.label}</Text>
        <Text>Destination: {mockTransferSummary.destination.label}</Text>
        <Text>Amount: {mockTransferSummary.amount.formatted}</Text>
        <Text>Estimated charges: {mockTransferSummary.charges?.formatted}</Text>
        <Text>
          Exchange rate placeholder: {mockTransferSummary.exchangeRate?.fromCurrency} to{' '}
          {mockTransferSummary.exchangeRate?.toCurrency} at {mockTransferSummary.exchangeRate?.rate}
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('TransferResult')}>
        Confirm placeholder transfer
      </Button>
    </Screen>
  );
}
