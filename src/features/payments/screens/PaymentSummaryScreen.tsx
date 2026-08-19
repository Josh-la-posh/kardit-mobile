import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { MoneyText } from '@/components/ui/MoneyText';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentSummary } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentSummary'>;

export function PaymentSummaryScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Payment summary"
        subtitle="Review a demo supplier payment before the authentication placeholder."
      />
      <InfoCard title="Payment summary">
        <MoneyText size="medium">{mockPaymentSummary.amount.formatted}</MoneyText>
        <ListItem title="Supplier" detail={mockPaymentSummary.supplier.displayName} />
        <ListItem title="Funding source" detail={mockPaymentSummary.fundingSource.label} />
        <ListItem
          title="Documents required"
          detail={mockPaymentSummary.documentsRequired ? 'Yes' : 'No'}
        />
      </InfoCard>
      <Button
        variant="secondary"
        onPress={() => navigation.getParent()?.navigate('Documents', { screen: 'UploadDocument' })}
      >
        Add required document placeholder
      </Button>
      <Button onPress={() => navigation.navigate('PaymentAuthentication')}>
        Continue to authentication placeholder
      </Button>
    </Screen>
  );
}
