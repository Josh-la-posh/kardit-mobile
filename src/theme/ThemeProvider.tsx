import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colorSchemes } from './tokens';

export type ThemePreference = 'light' | 'dark' | 'system';
const KEY = '@kardit/theme';
const ThemeContext = createContext<{ preference: ThemePreference; setPreference: (value: ThemePreference) => void }>({ preference: 'light', setPreference: () => undefined });

export function ThemeProvider({ children }: PropsWithChildren) {
  const [preference, setPreferenceState] = useState<ThemePreference>('light');
  useEffect(() => { void AsyncStorage.getItem(KEY).then((value) => { if (value === 'dark' || value === 'light' || value === 'system') setPreferenceState(value); }); }, []);
  const setPreference = (value: ThemePreference) => { setPreferenceState(value); void AsyncStorage.setItem(KEY, value); };
  return <ThemeContext.Provider value={{ preference, setPreference }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const { preference, setPreference } = useContext(ThemeContext);
  const system = useColorScheme();
  const isDark = preference === 'dark' || (preference === 'system' && system === 'dark');
  return useMemo(() => ({ colors: isDark ? colorSchemes.dark : colorSchemes.light, isDark, preference, setPreference }), [isDark, preference]);
}
