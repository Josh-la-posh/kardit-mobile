import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import type { AccountStackParamList } from '@/navigation/types';
import { mockAccount, mockAccountCapabilities, mockAccountSessionInfo } from '@/utils/mockData';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountDetails'>;

export function AccountDetailsScreen({ navigation }: Props) {
  return (
    <Screen>
      <InfoCard title="Account details">
        <Text>
          PRD-ready placeholder for authenticated importer account information, stakeholder role,
          provisioning status, and wallet readiness.
        </Text>
      </InfoCard>
      <InfoCard title={mockAccount.profile.businessName}>
        <Text>Stakeholder type: {mockAccount.profile.role}</Text>
        <Text>Contact: {mockAccount.profile.email}</Text>
        <Text>Phone: {mockAccount.profile.phoneNumber}</Text>
        <Text>Address: {mockAccount.profile.contactAddress}</Text>
        <Text>Account status: {mockAccount.provisioningStatus}</Text>
        <Text>Wallet status: {mockAccount.wallet?.status ?? 'Pending assignment'}</Text>
      </InfoCard>
      <InfoCard title="Capabilities placeholder">
        {mockAccountCapabilities.map((capability) => (
          <Text key={capability.key}>
            {capability.label}: {capability.enabled ? 'Enabled' : 'Disabled'}
          </Text>
        ))}
      </InfoCard>
      <InfoCard title="Session placeholder">
        <Text>Last login: {mockAccountSessionInfo.lastLoginAt}</Text>
        <Text>Device: {mockAccountSessionInfo.deviceName}</Text>
      </InfoCard>
      <Button onPress={() => navigation.navigate('AccountSecurity')}>Security and access</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('LogoutConfirmation')}>
        Logout confirmation placeholder
      </Button>
    </Screen>
  );
}
