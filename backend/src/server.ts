import { createApp } from './app.js';
import { serverConfig } from './config/env.js';

const app = createApp();
const shutdownTimeoutMs = 10_000;

const server = app.listen(serverConfig.port, () => {
  process.stdout.write(
    `${JSON.stringify({
      level: 'info',
      service: 'network-specialist-backend',
      port: serverConfig.port,
      nodeEnv: serverConfig.nodeEnv,
    })}\n`
  );
});

server.on('error', (error) => {
  process.stderr.write(
    `${JSON.stringify({
      level: 'error',
      service: 'network-specialist-backend',
      message: 'Server failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })}\n`
  );
  process.exitCode = 1;
});

let isShuttingDown = false;

function shutdown(signal: NodeJS.Signals): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  process.stdout.write(
    `${JSON.stringify({
      level: 'info',
      service: 'network-specialist-backend',
      message: 'Shutdown requested',
      signal,
    })}\n`
  );

  const timeout = setTimeout(() => {
    process.stderr.write(
      `${JSON.stringify({
        level: 'error',
        service: 'network-specialist-backend',
        message: 'Forced shutdown after timeout',
      })}\n`
    );
    process.exit(1);
  }, shutdownTimeoutMs);
  timeout.unref();

  server.close((error) => {
    clearTimeout(timeout);

    if (error) {
      process.stderr.write(
        `${JSON.stringify({
          level: 'error',
          service: 'network-specialist-backend',
          message: 'Shutdown failed',
          error: error.message,
        })}\n`
      );
      process.exit(1);
    }

    process.stdout.write(
      `${JSON.stringify({
        level: 'info',
        service: 'network-specialist-backend',
        message: 'Shutdown complete',
      })}\n`
    );
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
