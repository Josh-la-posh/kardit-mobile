import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { CasesStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseType'>;

export function CaseTypeScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Case category">
        <Text>
          Placeholder case categories for payment, card, wallet, document, account, and other
          issues. Final categories are pending backend contracts.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('CreateCase')}>Payment issue</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('CreateCase')}>
        Card issue
      </Button>
      <Button variant="secondary" onPress={() => navigation.navigate('CreateCase')}>
        Account issue
      </Button>
    </Screen>
  );
}
