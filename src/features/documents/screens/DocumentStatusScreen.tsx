import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { DocumentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'DocumentStatus'>;

export function DocumentStatusScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <InfoCard title="Document validation status">
        <Text>Document: {route.params.documentId ?? 'Placeholder document'}</Text>
        <Text>
          Placeholder status only. Real validation, rejection reasons, and additional-info requests
          are pending Kardit Core contracts.
        </Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('DocumentsHome')}>Done</Button>
    </Screen>
  );
}
