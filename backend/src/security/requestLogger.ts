import type { RequestHandler } from 'express';
import { getRequestId, getRequestPath } from './requestContext.js';

export const technicalRequestLogger: RequestHandler = (request, response, next) => {
  const startedAt = process.hrtime.bigint();

  response.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const requestId = getRequestId(request);
    const message = {
      level: 'info',
      ...(requestId ? { requestId } : {}),
      method: request.method,
      path: getRequestPath(request),
      status: response.statusCode,
      durationMs: Number(durationMs.toFixed(1)),
    };

    process.stdout.write(`${JSON.stringify(message)}\n`);
  });

  next();
};
