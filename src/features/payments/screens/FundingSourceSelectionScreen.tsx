import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Select } from '@/components/ui/Select';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentFundingSources } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'FundingSourceSelection'>;

export function FundingSourceSelectionScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Funding source">
        {mockPaymentFundingSources.map((source) => (
          <Text key={source.id}>
            {source.label}: {source.availableBalance?.formatted}
          </Text>
        ))}
      </InfoCard>
      <Select label="Funding source" placeholder="Eligible wallet or UnionPay card" />
      <Button onPress={() => navigation.navigate('PaymentSummary')}>Review payment</Button>
    </Screen>
  );
}
