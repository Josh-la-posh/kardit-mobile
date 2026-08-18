import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { MainTabParamList } from '@/navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Support'>;

export function SupportScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Support and help">
        <Text>Placeholder for importer help topics, ticket creation, and contact options.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('Cases', { screen: 'CasesHome' })}>
        View cases
      </Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('Cases', { screen: 'CaseType' })}
      >
        Create case
      </Button>
    </Screen>
  );
}
