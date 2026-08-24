import { useState } from 'react';
import { Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/layout/Screen';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'AdditionalInformationRequired'>;

export function AdditionalInformationRequiredScreen({ navigation }: Props) {
  const [message, setMessage] = useState('');
  const { application, error, loading, submitAdditionalInformation } = useImporterOnboarding();

  return (
    <Screen>
      <InfoCard title="Additional information required">
        <Text>{application?.complianceReason || 'Compliance has requested more information.'}</Text>
        {application?.requestedItems?.map((item) => <ListItem key={item} title={item} detail="Requested" />)}
      </InfoCard>
      <Input label="Message to Compliance" value={message} onChangeText={setMessage} multiline />
      {error ? <ListItem title="Update failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || !message.trim()}
        onPress={() => void submitAdditionalInformation(message).then((submitted) => submitted && navigation.navigate('ApplicationStatus'))}
      >
        {loading ? 'Saving updates...' : 'Save updates'}
      </Button>
    </Screen>
  );
}
