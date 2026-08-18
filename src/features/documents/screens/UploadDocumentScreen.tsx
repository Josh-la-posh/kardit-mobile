import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { DocumentsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<DocumentsStackParamList, 'UploadDocument'>;

export function UploadDocumentScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <InfoCard title="Upload document placeholder">
        <Text>
          Real file picker, upload transport, preview, and validation are pending backend contracts.
        </Text>
        <Text>Transaction placeholder: {route.params.transactionId ?? 'None selected'}</Text>
      </InfoCard>
      <Select label="Document type" placeholder="Invoice, purchase order, or other" />
      <Input label="Document name" placeholder="supplier-invoice.pdf" />
      <Button onPress={() => navigation.navigate('DocumentStatus', {})}>
        Submit placeholder document
      </Button>
    </Screen>
  );
}
