import type { Request } from 'express';

export function getRequestId(request: Request): string | undefined {
  const requestId = request.header('x-request-id');
  return requestId && requestId.trim().length > 0 ? requestId.trim() : undefined;
}

export function getRequestPath(request: Request): string {
  return request.originalUrl.split('?')[0] ?? request.path;
}
