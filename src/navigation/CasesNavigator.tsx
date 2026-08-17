import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CaseDetailsScreen } from '@/features/cases/screens/CaseDetailsScreen';
import { CasesScreen } from '@/features/cases/screens/CasesScreen';
import { CreateCaseScreen } from '@/features/cases/screens/CreateCaseScreen';

import type { CasesStackParamList } from './types';

const Stack = createNativeStackNavigator<CasesStackParamList>();

export function CasesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CasesHome" component={CasesScreen} options={{ title: 'Cases' }} />
      <Stack.Screen
        name="CreateCase"
        component={CreateCaseScreen}
        options={{ title: 'Create Case' }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetailsScreen}
        options={{ title: 'Case Details' }}
      />
    </Stack.Navigator>
  );
}
