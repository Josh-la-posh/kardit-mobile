import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function BankAccountPaymentScreen() {
  return (
    <Screen>
      <InfoCard title="Bank account payment">
        <Text>
          PRD-ready placeholder for supplier bank-account details, funding-source rules, compliance
          documents, payment summary, authentication, and result states.
        </Text>
      </InfoCard>
      <Input label="Supplier name" placeholder="Supplier business name" />
      <Input label="Bank account" placeholder="Account number" keyboardType="numeric" />
      <Select label="Funding source" placeholder="Eligible card or central wallet" />
      <Button>Preview payment placeholder</Button>
    </Screen>
  );
}
