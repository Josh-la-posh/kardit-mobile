import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Select } from '@/components/ui/Select';
import { mockIssuingBanks } from '@/utils/mockData';

export function CreateCardScreen() {
  return (
    <Screen>
      <InfoCard title="Issuing bank options">
        <Text>
          TODO: Importers can select from all available issuing banks during issuance. Current
          placeholder banks: {mockIssuingBanks.map((bank) => bank.name).join(', ')}.
        </Text>
      </InfoCard>
      <Text>
        TODO: Enforce maximum of 6 active importer cards after backend contract is confirmed.
      </Text>
      <Select label="Issuing bank" placeholder="Select issuing bank" />
      <Select label="Card type" placeholder="Virtual or physical" />
      <Button>Create card placeholder</Button>
    </Screen>
  );
}
