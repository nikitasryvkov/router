import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import { after, before, describe, it } from 'node:test';
import { createApp } from '../src/app.js';

type PublicConfigResponse = {
  email: string;
  telegramUrl: string;
};

let server: Server;
let baseUrl: string;

before(async () => {
  server = await new Promise<Server>((resolve) => {
    const appServer = createApp().listen(0, '127.0.0.1', () => {
      resolve(appServer);
    });
  });

  const address = server.address();
  assert.ok(address && typeof address === 'object');
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

describe('backend HTTP contracts', () => {
  it('returns health status', async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: 'ok',
      service: 'network-specialist-backend',
    });
  });

  it('returns public config without caching', async () => {
    const response = await fetch(`${baseUrl}/api/public-config`);
    const body = (await response.json()) as PublicConfigResponse;

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(body.email, 'denis@c777.ru');
    assert.equal(body.telegramUrl, 'https://t.me/czzttt');
  });

  it('returns 404 for missing static assets', async () => {
    const response = await fetch(`${baseUrl}/static/not-found.txt`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.deepEqual(body, { error: 'Not found' });
  });

  it('sets security headers on API responses', async () => {
    const response = await fetch(`${baseUrl}/api/health`, {
      headers: {
        'x-request-id': 'test-request-id',
      },
    });
    const csp = response.headers.get('content-security-policy') ?? '';

    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('x-frame-options'), 'DENY');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.match(csp, /form-action 'none'/);
    assert.match(csp, /frame-ancestors 'none'/);
  });
});
