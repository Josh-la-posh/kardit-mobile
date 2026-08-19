import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { providerChoiceHiddenNote } from '@/features/payments/paymentRouting';
import type { PaymentsStackParamList } from '@/navigation/types';
import { mockPaymentRoutes } from '@/utils/mockData';

type Props = NativeStackScreenProps<PaymentsStackParamList, 'PaymentsHome'>;

export function PaymentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Supplier payments"
        subtitle="Choose a demo entry point. Backend/Core will select the real route and provider behind the scenes."
      />
      <InfoCard title="Route ownership">
        <ListItem title="Provider choice" meta={providerChoiceHiddenNote} detail="Hidden" />
      </InfoCard>
      <InfoCard title="Payment routes">
        {mockPaymentRoutes.map((route) => (
          <ListItem key={route.route} title={route.label} meta={route.description} detail="Demo" />
        ))}
      </InfoCard>
      <Button onPress={() => navigation.navigate('QrPayment')}>QR payment</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('BankAccountPayment')}>
        Bank account payment
      </Button>
    </Screen>
  );
}
