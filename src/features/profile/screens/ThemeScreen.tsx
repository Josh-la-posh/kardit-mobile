import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { spacing, typography, useTheme, type ThemePreference } from '@/theme';

export function ThemeScreen() {
  const { colors, preference, setPreference } = useTheme();
  const options: { label: string; value: ThemePreference }[] = [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'Use device setting', value: 'system' }];
  return <Screen><Text style={[styles.title, { color: colors.titleText }]}>App theme</Text><View style={[styles.card, { backgroundColor: colors.cardBackground }]}>{options.map((option, index) => <Pressable key={option.value} onPress={() => setPreference(option.value)} style={[styles.row, index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 }]}><Text style={[styles.label, { color: colors.text }]}>{option.label}</Text><Text style={[styles.radio, { color: preference === option.value ? colors.iconColor : colors.textMuted }]}>{preference === option.value ? '●' : '○'}</Text></Pressable>)}</View></Screen>;
}
const styles = StyleSheet.create({ title: { fontSize: typography.hMd, fontWeight: '700' }, card: { borderRadius: 12, paddingHorizontal: spacing.lg }, row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', minHeight: 56 }, label: { fontSize: typography.body }, radio: { fontSize: 22 } });
