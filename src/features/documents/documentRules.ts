import type { ComplianceDocumentRequirement } from '@/types/document';
import type { PaymentRoute } from '@/types/payment';

export function getDocumentRequirementsPlaceholder(
  route: PaymentRoute,
): ComplianceDocumentRequirement[] {
  // TODO: Replace with Kardit Core compliance document rules per payment, amount, route, and supplier.
  if (route === 'supplier_bank_account') {
    return [
      {
        documentType: 'invoice',
        required: true,
        ruleSource: 'core_placeholder',
      },
      {
        documentType: 'purchase_order',
        required: true,
        ruleSource: 'core_placeholder',
      },
    ];
  }

  return [
    {
      documentType: 'invoice',
      required: false,
      ruleSource: 'core_placeholder',
    },
  ];
}

export const documentDecisioningNote =
  'Document requirements are determined by Kardit Core and should not be manually selected by the user.';
