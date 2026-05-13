import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicConfigRouter } from './controllers/publicConfigController.js';
import { healthRouter } from './health/healthController.js';
import { getRequestId, getRequestPath } from './security/requestContext.js';
import { technicalRequestLogger } from './security/requestLogger.js';
import { createSecurityHeaders, noStoreHeaders } from './security/securityHeaders.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDirectory = path.resolve(dirname, '../static');

type HttpError = Error & {
  expose?: boolean;
  status?: number;
  statusCode?: number;
};

function getHttpStatus(error: unknown): number {
  const candidate =
    typeof error === 'object' && error !== null
      ? ((error as HttpError).status ?? (error as HttpError).statusCode)
      : undefined;

  return typeof candidate === 'number' && candidate >= 400 && candidate <= 599
    ? candidate
    : 500;
}

function getPublicErrorMessage(error: unknown, status: number): string {
  if (status === 404) {
    return 'Not found';
  }

  if (
    status < 500 &&
    typeof error === 'object' &&
    error !== null &&
    (error as HttpError).expose &&
    typeof (error as HttpError).message === 'string'
  ) {
    return (error as HttpError).message;
  }

  return status >= 500 ? 'Internal server error' : 'Request error';
}

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(createSecurityHeaders());
  app.use(technicalRequestLogger);

  app.get('/', noStoreHeaders, (_request, response) => {
    response.status(204).send();
  });

  app.use(
    '/static',
    express.static(staticDirectory, {
      dotfiles: 'deny',
      etag: true,
      fallthrough: false,
      index: false,
      maxAge: '1h',
    })
  );

  app.use('/api/health', noStoreHeaders, healthRouter);
  app.use('/api/public-config', noStoreHeaders, publicConfigRouter);

  app.use((_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });

  app.use(
    (
      error: unknown,
      request: express.Request,
      response: express.Response,
      _next: express.NextFunction
    ) => {
      const status = getHttpStatus(error);
      const requestId = getRequestId(request);
      const logMessage = {
        level: status >= 500 ? 'error' : 'warn',
        ...(requestId ? { requestId } : {}),
        method: request.method,
        path: getRequestPath(request),
        status,
        message: status >= 500 ? 'Unhandled server error' : 'Request failed',
      };
      const logLine = `${JSON.stringify(logMessage)}\n`;

      if (status >= 500) {
        process.stderr.write(logLine);
      } else {
        process.stdout.write(logLine);
      }

      response.status(status).json({ error: getPublicErrorMessage(error, status) });
    }
  );

  return app;
}
