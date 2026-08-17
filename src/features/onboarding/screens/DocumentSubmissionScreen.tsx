import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'DocumentSubmission'>;

export function DocumentSubmissionScreen({ navigation }: Props) {
  return (
    <Screen>
      <Text>TODO: Documents vary by applicant role and compliance requirements.</Text>
      <EmptyState
        title="No documents uploaded"
        message="Document picker and upload queue will be added after requirements are confirmed."
      />
      <Button onPress={() => navigation.navigate('BusinessProfile')}>Continue</Button>
    </Screen>
  );
}
