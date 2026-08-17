import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ReviewDeclaration'>;

export function ReviewDeclarationScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Review summary">
        <Text>TODO: Render captured applicant, document, business, and import profile data.</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('ApplicationStatus')}>Submit application</Button>
    </Screen>
  );
}
