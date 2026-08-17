import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function FundsTransferScreen() {
  return (
    <Screen>
      <InfoCard title="Funds transfer">
        <Text>
          PRD-ready placeholder for Card to Wallet and Wallet to Card transfer validation, summary,
          submission, and result states.
        </Text>
      </InfoCard>
      <Select label="Direction" placeholder="Card to Wallet or Wallet to Card" />
      <Select label="Card" placeholder="Select eligible UnionPay card" />
      <Input label="Amount" placeholder="0.00" keyboardType="numeric" />
      <Button>Preview transfer placeholder</Button>
    </Screen>
  );
}
