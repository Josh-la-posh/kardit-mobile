import type { Supplier, SupplierUpsertRequest } from '@/types/supplier';

import { apiClient } from './client';

// TODO: Confirm Kardit Core supplier/beneficiary endpoints and bank-detail validation contract.
export const suppliersApi = {
  listSuppliers: () => apiClient.get<Supplier[]>('/importers/suppliers'),
  getSupplier: (supplierId: string) =>
    apiClient.get<Supplier>(`/importers/suppliers/${supplierId}`),
  createSupplier: (request: SupplierUpsertRequest) =>
    apiClient.post<Supplier>('/importers/suppliers', request),
  updateSupplier: (supplierId: string, request: SupplierUpsertRequest) =>
    apiClient.post<Supplier>(`/importers/suppliers/${supplierId}`, request),
  validateBankAccount: (request: SupplierUpsertRequest) =>
    apiClient.post<{ valid: boolean; message?: string }>(
      '/importers/suppliers/bank-accounts/validate',
      request,
    ),
};
