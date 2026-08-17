import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function FundCardScreen() {
  return (
    <Screen>
      <Text>
        TODO: Importers can fund cards they own once eligibility and funding rails are known.
      </Text>
      <Input label="Amount" placeholder="0.00" keyboardType="numeric" />
      <Button>Submit funding request</Button>
    </Screen>
  );
}
