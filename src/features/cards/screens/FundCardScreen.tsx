import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { mockCards } from '@/utils/mockData';

export function FundCardScreen() {
  const card = mockCards[0];

  return (
    <Screen>
      <InfoCard title="Fund card placeholder">
        <Text>
          Selected card placeholder: {card.label}. Real card funding, wallet debit, validation, and
          balance updates are pending backend contracts.
        </Text>
      </InfoCard>
      <Input label="Amount" placeholder="0.00" keyboardType="numeric" />
      <Button>Submit funding request</Button>
    </Screen>
  );
}
