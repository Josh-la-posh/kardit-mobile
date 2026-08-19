import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StatusPill } from '@/components/ui/StatusPill';
import type { AccountStackParamList } from '@/navigation/types';
import { mockAccount, mockAccountCapabilities, mockAccountSessionInfo } from '@/utils/mockData';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountDetails'>;

export function AccountDetailsScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Account profile"
        subtitle="Demo importer profile, capabilities, session information, and logout state."
      />
      <InfoCard title={mockAccount.profile.businessName}>
        <StatusPill label={mockAccount.provisioningStatus} tone="success" />
        <ListItem title="Stakeholder type" detail={mockAccount.profile.role} />
        <ListItem
          title="Contact"
          meta={mockAccount.profile.email}
          detail={mockAccount.profile.phoneNumber}
        />
        <ListItem title="Wallet" detail={mockAccount.wallet?.status ?? 'Pending assignment'} />
      </InfoCard>
      <InfoCard title="Capabilities placeholder">
        {mockAccountCapabilities.map((capability) => (
          <ListItem
            key={capability.key}
            title={capability.label}
            meta={capability.reason}
            detail={capability.enabled ? 'Enabled' : 'Disabled'}
          />
        ))}
      </InfoCard>
      <InfoCard title="Session placeholder">
        <ListItem title="Last login" detail={mockAccountSessionInfo.lastLoginAt} />
        <ListItem title="Device" detail={mockAccountSessionInfo.deviceName} />
      </InfoCard>
      <Button onPress={() => navigation.navigate('AccountSecurity')}>Security and access</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('LogoutConfirmation')}>
        Logout confirmation placeholder
      </Button>
    </Screen>
  );
}
