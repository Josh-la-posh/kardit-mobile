import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { DocumentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'DocumentLink'>;

export function DocumentLinkScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <InfoCard title="Link document">
        <Text>Document: {route.params.documentId ?? 'Placeholder document'}</Text>
        <Text>Transaction: {route.params.transactionId ?? 'Placeholder transaction'}</Text>
        <Text>Real linking and audit updates are pending backend contracts.</Text>
      </InfoCard>
      <Button
        onPress={() =>
          navigation.navigate('DocumentStatus', { documentId: route.params.documentId })
        }
      >
        Link placeholder
      </Button>
    </Screen>
  );
}
