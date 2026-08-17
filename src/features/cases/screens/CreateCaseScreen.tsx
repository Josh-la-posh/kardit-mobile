import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function CreateCaseScreen() {
  return (
    <Screen>
      <InfoCard title="Create case">
        <Text>
          PRD-ready placeholder for case type, related card or transaction, issue description, and
          attachments.
        </Text>
      </InfoCard>
      <Select label="Case type" placeholder="Select case category" />
      <Input label="Issue description" placeholder="Describe the issue" multiline />
      <Button>Submit case placeholder</Button>
    </Screen>
  );
}
