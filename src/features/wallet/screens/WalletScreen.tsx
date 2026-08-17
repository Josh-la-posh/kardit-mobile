import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import type { WalletStackParamList } from '@/navigation/types';
import { mockExchangeRates, mockWallet, mockWalletOverview } from '@/utils/mockData';

type Props = NativeStackScreenProps<WalletStackParamList, 'WalletHome'>;

export function WalletScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Central wallet">
        <Text>
          PRD-ready placeholder for the importer wallet balance, wallet status, and wallet-based
          activity controls. Mock balance: {mockWallet.balance.formatted}.
        </Text>
      </InfoCard>
      <InfoCard title="Exchange rates">
        {mockExchangeRates.map((rate) => (
          <Text key={`${rate.fromCurrency}-${rate.toCurrency}`}>
            {rate.fromCurrency} to {rate.toCurrency}: {rate.rate}
          </Text>
        ))}
      </InfoCard>
      {mockWalletOverview.recentTransfers.length === 0 ? (
        <EmptyState
          title="No wallet transfers"
          message="Wallet transfer activity will appear here after backend contracts are confirmed."
        />
      ) : (
        <InfoCard title="Recent transfer placeholder">
          <Text>{mockWalletOverview.recentTransfers[0].reference}</Text>
        </InfoCard>
      )}
      <Button onPress={() => navigation.navigate('FundsTransfer')}>Funds transfer</Button>
    </Screen>
  );
}
