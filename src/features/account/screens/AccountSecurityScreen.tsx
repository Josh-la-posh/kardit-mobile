import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { mockAccountCapabilities, mockAccountSessionInfo } from '@/utils/mockData';

export function AccountSecurityScreen() {
  return (
    <Screen>
      <InfoCard title="Security and access">
        <Text>Session: {mockAccountSessionInfo.sessionId}</Text>
        <Text>Device: {mockAccountSessionInfo.deviceName}</Text>
        <Text>Last login: {mockAccountSessionInfo.lastLoginAt}</Text>
        <Text>{mockAccountSessionInfo.ipAddressPlaceholder}</Text>
      </InfoCard>
      <InfoCard title="Capabilities">
        {mockAccountCapabilities.map((capability) => (
          <Text key={capability.key}>
            {capability.label}: {capability.enabled ? 'Enabled' : capability.reason}
          </Text>
        ))}
      </InfoCard>
      <Button variant="secondary">Credential reset placeholder</Button>
    </Screen>
  );
}
