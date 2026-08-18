import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CaseDetailsScreen } from '@/features/cases/screens/CaseDetailsScreen';
import { CaseEvidenceScreen } from '@/features/cases/screens/CaseEvidenceScreen';
import { CaseInformationResponseScreen } from '@/features/cases/screens/CaseInformationResponseScreen';
import { CaseTypeScreen } from '@/features/cases/screens/CaseTypeScreen';
import { CasesScreen } from '@/features/cases/screens/CasesScreen';
import { CreateCaseScreen } from '@/features/cases/screens/CreateCaseScreen';

import type { CasesStackParamList } from './types';

const Stack = createNativeStackNavigator<CasesStackParamList>();

export function CasesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CasesHome" component={CasesScreen} options={{ title: 'Cases' }} />
      <Stack.Screen name="CaseType" component={CaseTypeScreen} options={{ title: 'Case Type' }} />
      <Stack.Screen
        name="CreateCase"
        component={CreateCaseScreen}
        options={{ title: 'Create Case' }}
      />
      <Stack.Screen
        name="CaseEvidence"
        component={CaseEvidenceScreen}
        options={{ title: 'Case Evidence' }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetailsScreen}
        options={{ title: 'Case Details' }}
      />
      <Stack.Screen
        name="CaseInformationResponse"
        component={CaseInformationResponseScreen}
        options={{ title: 'Additional Information' }}
      />
    </Stack.Navigator>
  );
}
