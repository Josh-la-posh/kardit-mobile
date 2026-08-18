import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { CasesStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CasesStackParamList, 'CreateCase'>;

export function CreateCaseScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Create case">
        <Text>
          PRD-ready placeholder for case type, related card or transaction, issue description, and
          attachments.
        </Text>
      </InfoCard>
      <Select label="Case type" placeholder="Select case category" />
      <Select label="Linked record" placeholder="Transaction, card, payment, or document" />
      <Select label="Priority" placeholder="Placeholder priority" />
      <Input label="Subject" placeholder="Short case title" />
      <Input label="Issue description" placeholder="Describe the issue" multiline />
      <Button onPress={() => navigation.navigate('CaseEvidence', {})}>Continue placeholder</Button>
    </Screen>
  );
}
