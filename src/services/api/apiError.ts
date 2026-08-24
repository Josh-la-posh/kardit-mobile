export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export function getApiErrorMessage(cause: unknown, fallback: string) {
  if (!(cause instanceof ApiError)) {
    return cause instanceof Error ? cause.message : fallback;
  }

  const body = cause.body;
  if (typeof body === 'string' && body.trim()) return body;
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    const message =
      record.message ??
      record.error ??
      record.detail ??
      record.title ??
      record.responseMessage ??
      record.ResponseMessage;
    if (typeof message === 'string' && message.trim()) return message;
    if (Array.isArray(message) && message.length) return message.join(', ');
  }

  return cause.message || fallback;
}
