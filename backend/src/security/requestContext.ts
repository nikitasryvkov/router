import type { Request } from 'express';

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{1,64}$/;

export function normalizeRequestId(value: string | undefined): string | undefined {
  if (!value || /[\r\n]/.test(value)) {
    return undefined;
  }

  const requestId = value?.trim();

  if (!requestId || !REQUEST_ID_PATTERN.test(requestId)) {
    return undefined;
  }

  return requestId;
}

export function getRequestId(request: Request): string | undefined {
  return normalizeRequestId(request.header('x-request-id'));
}

export function getRequestPath(request: Request): string {
  return request.originalUrl.split('?')[0] ?? request.path;
}
