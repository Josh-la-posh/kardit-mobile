import { getDocumentRequirementsPlaceholder } from '@/features/documents/documentRules';

describe('getDocumentRequirementsPlaceholder', () => {
  it('requires supporting documents for supplier bank-account payments', () => {
    const requirements = getDocumentRequirementsPlaceholder('supplier_bank_account');

    expect(requirements.every((requirement) => requirement.required)).toBe(true);
    expect(requirements.map((requirement) => requirement.documentType)).toEqual([
      'invoice',
      'purchase_order',
    ]);
  });

  it('keeps QR document requirements optional in the placeholder model', () => {
    expect(getDocumentRequirementsPlaceholder('unionpay_qr')).toEqual([
      { documentType: 'invoice', required: false, ruleSource: 'core_placeholder' },
    ]);
  });
});
