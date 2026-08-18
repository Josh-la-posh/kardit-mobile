import { getQrRouteDecisionPlaceholder } from '@/features/payments/paymentRouting';
import type { QrProcessingResult } from '@/types/payment';

const qrResult: QrProcessingResult = {
  qrReference: 'QR-TEST',
  status: 'readable',
};

describe('getQrRouteDecisionPlaceholder', () => {
  it('keeps readable supported QR payments on the UnionPay QR placeholder route', () => {
    expect(getQrRouteDecisionPlaceholder(qrResult).route).toBe('unionpay_qr');
  });

  it('routes above-threshold QR payments to bank-account payment', () => {
    expect(getQrRouteDecisionPlaceholder({ ...qrResult, status: 'above_threshold' }).route).toBe(
      'supplier_bank_account',
    );
  });

  it('routes unsupported QR payments to bank-account payment', () => {
    expect(getQrRouteDecisionPlaceholder({ ...qrResult, status: 'unsupported' }).route).toBe(
      'supplier_bank_account',
    );
  });
});
