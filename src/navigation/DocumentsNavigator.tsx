import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DocumentDetailsScreen } from '@/features/documents/screens/DocumentDetailsScreen';
import { DocumentLinkScreen } from '@/features/documents/screens/DocumentLinkScreen';
import { DocumentStatusScreen } from '@/features/documents/screens/DocumentStatusScreen';
import { DocumentsScreen } from '@/features/documents/screens/DocumentsScreen';
import { UploadDocumentScreen } from '@/features/documents/screens/UploadDocumentScreen';

import type { DocumentsStackParamList } from './types';

const Stack = createNativeStackNavigator<DocumentsStackParamList>();

export function DocumentsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DocumentsHome"
        component={DocumentsScreen}
        options={{ title: 'Documents' }}
      />
      <Stack.Screen
        name="DocumentDetails"
        component={DocumentDetailsScreen}
        options={{ title: 'Document Details' }}
      />
      <Stack.Screen
        name="UploadDocument"
        component={UploadDocumentScreen}
        options={{ title: 'Upload Document' }}
      />
      <Stack.Screen
        name="DocumentLink"
        component={DocumentLinkScreen}
        options={{ title: 'Link Document' }}
      />
      <Stack.Screen
        name="DocumentStatus"
        component={DocumentStatusScreen}
        options={{ title: 'Document Status' }}
      />
    </Stack.Navigator>
  );
}
