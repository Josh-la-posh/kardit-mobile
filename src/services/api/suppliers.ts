import type { Supplier, SupplierUpsertRequest } from '@/types/supplier';

import { apiClient } from './client';

// TODO: Confirm Kardit Core supplier/beneficiary endpoints and bank-detail validation contract.
export const suppliersApi = {
  getSuppliers: () => apiClient.get<Supplier[]>('/importers/suppliers'),
  listSuppliers: () => apiClient.get<Supplier[]>('/importers/suppliers'),
  getSupplierDetails: (supplierId: string) =>
    apiClient.get<Supplier>(`/importers/suppliers/${supplierId}`),
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
  validateSupplierBankDetails: (request: SupplierUpsertRequest) =>
    apiClient.post<{ status: string; valid: boolean; message?: string }>(
      '/importers/suppliers/validate',
      request,
    ),
  deactivateSupplier: (supplierId: string) =>
    apiClient.post<{ deactivated: boolean }>(`/importers/suppliers/${supplierId}/deactivate`, {}),
};
