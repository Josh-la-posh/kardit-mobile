import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { AccountStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';

type Props = NativeStackScreenProps<AccountStackParamList, 'LogoutConfirmation'>;

export function LogoutConfirmationScreen({ navigation }: Props) {
  const [visible, setVisible] = useState(true);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Screen>
      <InfoCard title="Log out">
        <ListItem
          title="Demo session"
          meta="Logout clears only the local demo session."
          detail="Local"
        />
      </InfoCard>
      <Button onPress={() => setVisible(true)}>Logout</Button>
      <Button variant="secondary" onPress={() => navigation.navigate('AccountDetails')}>
        Keep session
      </Button>
      <ConfirmDialog
        confirmLabel="Logout"
        message="This clears the local demo session. Session revocation API is pending."
        onCancel={() => setVisible(false)}
        onConfirm={() => {
          setVisible(false);
          void signOut().then(() => navigation.navigate('LogoutResult'));
        }}
        title="Log out?"
        visible={visible}
      />
    </Screen>
  );
}
