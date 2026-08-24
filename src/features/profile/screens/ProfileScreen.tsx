import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/layout/Screen';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import type { AccountStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { radii, spacing, typography, useTheme } from '@/theme';
import { mockAccount } from '@/utils/mockData';

type Props = Partial<NativeStackScreenProps<AccountStackParamList, 'AccountHome'>>;
type Row = { label: string; icon: keyof typeof Ionicons.glyphMap; onPress?: () => void };

export function ProfileScreen({ navigation }: Props) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const signOut = useAuthStore((state) => state.signOut);
  const { colors } = useTheme();
  const rows: Row[] = [
    { label: 'Help', icon: 'help-circle-outline' },
    { label: 'Statement & report', icon: 'document-text-outline', onPress: () => navigation?.navigate('AccountDetails') },
    { label: 'Account limits', icon: 'speedometer-outline' },
    { label: 'Saved cards', icon: 'card-outline' },
    { label: 'Security', icon: 'shield-checkmark-outline', onPress: () => navigation?.navigate('AccountSecurity') },
    { label: 'App themes', icon: 'color-palette-outline', onPress: () => navigation?.navigate('AccountTheme') },
  ];
  return <Screen>
    <View style={styles.identity}><View style={[styles.avatar, { backgroundColor: colors.primary }]}><Text style={styles.avatarText}>JI</Text></View><Text style={[styles.name, { color: colors.titleText }]}>{mockAccount.profile.fullName}</Text><Text style={[styles.business, { color: colors.textMuted }]}>{mockAccount.profile.businessName}</Text><Text style={[styles.contact, { color: colors.textMuted }]}>{mockAccount.profile.email}</Text></View>
    <Text style={[styles.sectionTitle, { color: colors.titleText }]}>Account</Text>
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>{rows.map((row, index) => <Pressable key={row.label} onPress={row.onPress} accessibilityRole="button" style={[styles.row, index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 }]}><Ionicons color={colors.iconColor} name={row.icon} size={21} /><Text style={[styles.label, { color: colors.text }]}>{row.label}</Text><Ionicons color={colors.textMuted} name="chevron-forward" size={18} /></Pressable>)}</View>
    <Pressable onPress={() => setConfirmLogout(true)} style={[styles.signOut, { borderColor: colors.danger }]}><Text style={[styles.signOutText, { color: colors.danger }]}>Sign out</Text></Pressable>
    <ConfirmDialog confirmLabel="Sign out" message="This clears the local demo session. No backend logout API is called yet." onCancel={() => setConfirmLogout(false)} onConfirm={() => { setConfirmLogout(false); void signOut(); }} title="Sign out?" visible={confirmLogout} />
  </Screen>;
}
const styles = StyleSheet.create({ avatar: { alignItems: 'center', borderRadius: 40, height: 80, justifyContent: 'center', width: 80 }, avatarText: { color: '#FFFFFF', fontSize: typography.hMd, fontWeight: '800' }, business: { fontSize: typography.body, fontWeight: '600' }, card: { borderRadius: radii.md, paddingHorizontal: spacing.lg }, contact: { fontSize: typography.small }, identity: { alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.lg }, label: { flex: 1, fontSize: typography.body, fontWeight: '600', marginLeft: spacing.md }, name: { fontSize: typography.hMd, fontWeight: '700' }, row: { alignItems: 'center', flexDirection: 'row', minHeight: 58 }, sectionTitle: { fontSize: typography.hSm, fontWeight: '700' }, signOut: { alignItems: 'center', borderRadius: radii.md, borderWidth: 1, justifyContent: 'center', minHeight: 50 }, signOutText: { fontSize: typography.body, fontWeight: '700' } });
