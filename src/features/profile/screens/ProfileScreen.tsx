import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import type { AccountStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { spacing, typography, useTheme } from '@/theme';
import { mockAccount } from '@/utils/mockData';

type Props = Partial<NativeStackScreenProps<AccountStackParamList, 'AccountHome'>>;

export function ProfileScreen({ navigation }: Props) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const signOut = useAuthStore((state) => state.signOut);
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: colors.forestDeep }]}>
          <Text style={styles.avatarText}>JI</Text>
        </View>
        <Text style={[styles.name, { color: colors.ink }]}>{mockAccount.profile.fullName}</Text>
        <Text style={[styles.business, { color: colors.ink2 }]}>
          {mockAccount.profile.businessName}
        </Text>
        <Text style={[styles.contact, { color: colors.muted }]}>{mockAccount.profile.email}</Text>
      </View>
      <InfoCard title="Profile">
        <ListItem title="Business profile" detail={mockAccount.profile.role} />
        <ListItem title="Contact details" detail={mockAccount.profile.phoneNumber} />
      </InfoCard>
      {navigation ? (
        <>
          <InfoCard title="Settings">
            <ListItem
              title="Account details"
              onPress={() => navigation.navigate('AccountDetails')}
            />
            <ListItem
              title="Security and access"
              onPress={() => navigation.navigate('AccountSecurity')}
            />
            <ListItem title="About Kardit" detail="Demo" />
            <ListItem title="Support and help" detail="Cases" />
          </InfoCard>
          <Button variant="ghost" onPress={() => setConfirmLogout(true)}>
            Logout
          </Button>
        </>
      ) : null}
      <ConfirmDialog
        confirmLabel="Logout"
        message="This clears the local demo session. No backend logout API is called yet."
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => {
          setConfirmLogout(false);
          void signOut();
        }}
        title="Log out?"
        visible={confirmLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: typography.hMd,
    fontWeight: '800',
  },
  business: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  contact: {
    fontSize: typography.small,
  },
  identity: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
  name: {
    fontSize: typography.hMd,
    fontWeight: '700',
  },
});
