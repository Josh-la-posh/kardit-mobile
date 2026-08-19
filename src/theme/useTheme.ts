import { useColorScheme } from 'react-native';

import { colorSchemes } from '@/theme/tokens';

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? colorSchemes.dark : colorSchemes.light,
    isDark,
  };
}
