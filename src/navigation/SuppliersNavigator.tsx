import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateSupplierScreen } from '@/features/suppliers/screens/CreateSupplierScreen';
import { EditSupplierScreen } from '@/features/suppliers/screens/EditSupplierScreen';
import { SupplierDetailsScreen } from '@/features/suppliers/screens/SupplierDetailsScreen';
import { SupplierValidationScreen } from '@/features/suppliers/screens/SupplierValidationScreen';
import { SuppliersScreen } from '@/features/suppliers/screens/SuppliersScreen';

import type { SuppliersStackParamList } from './types';

const Stack = createNativeStackNavigator<SuppliersStackParamList>();

export function SuppliersNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SuppliersHome"
        component={SuppliersScreen}
        options={{ title: 'Suppliers' }}
      />
      <Stack.Screen
        name="SupplierDetails"
        component={SupplierDetailsScreen}
        options={{ title: 'Supplier Details' }}
      />
      <Stack.Screen
        name="CreateSupplier"
        component={CreateSupplierScreen}
        options={{ title: 'Create Supplier' }}
      />
      <Stack.Screen
        name="EditSupplier"
        component={EditSupplierScreen}
        options={{ title: 'Edit Supplier' }}
      />
      <Stack.Screen
        name="SupplierValidation"
        component={SupplierValidationScreen}
        options={{ title: 'Supplier Validation' }}
      />
    </Stack.Navigator>
  );
}
