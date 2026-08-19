import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { MoneyText } from '@/components/ui/MoneyText';
import { StatusPill } from '@/components/ui/StatusPill';
import type { WalletStackParamList } from '@/navigation/types';
import { mockExchangeRates, mockWallet, mockWalletOverview } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'WalletHome'>;

export function WalletScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Central wallet"
        subtitle="Demo wallet overview for importer balance, FX rates, and card transfer entry points."
      />
      <InfoCard title="Central wallet">
        <MoneyText>{mockWallet.balance.formatted}</MoneyText>
        <StatusPill label={mockWallet.status} tone="success" />
      </InfoCard>
      <InfoCard title="Exchange rates">
        {mockExchangeRates.map((rate) => (
          <ListItem
            key={`${rate.fromCurrency}-${rate.toCurrency}`}
            title={`${rate.fromCurrency} to ${rate.toCurrency}`}
            meta="Indicative demo quote. Backend rate expiry pending."
            detail={rate.rate}
          />
        ))}
      </InfoCard>
      {mockWalletOverview.recentTransfers.length === 0 ? (
        <EmptyState
          title="No wallet transfers"
          message="Wallet transfer activity will appear here after backend contracts are confirmed."
        />
      ) : (
        <InfoCard title="Recent transfer placeholder">
          <ListItem
            title={mockWalletOverview.recentTransfers[0].reference}
            meta="Transfer status polling is pending backend contracts."
            detail={mockWalletOverview.recentTransfers[0].status}
          />
        </InfoCard>
      )}
      <Button onPress={() => navigation.navigate('FundsTransfer')}>Funds transfer</Button>
    </Screen>
  );
}
