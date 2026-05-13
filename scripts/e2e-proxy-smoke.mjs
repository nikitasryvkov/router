const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:8080';

async function request(path) {
  const response = await fetch(new URL(path, baseUrl));
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  return {
    body,
    contentType,
    headers: response.headers,
    status: response.status,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const home = await request('/');
assert(home.status === 200, `Expected / to return 200, got ${home.status}`);
assert(
  typeof home.body === 'string' && home.body.includes('<div id="root"></div>'),
  'Expected / to return the frontend document'
);

const health = await request('/api/health');
assert(health.status === 200, `Expected /api/health to return 200, got ${health.status}`);
assert(health.body.status === 'ok', 'Expected /api/health JSON status to be ok');

const publicConfig = await request('/api/public-config');
assert(
  publicConfig.status === 200,
  `Expected /api/public-config to return 200, got ${publicConfig.status}`
);
assert(
  publicConfig.body.telegramUrl === 'https://t.me/czzttt',
  'Expected /api/public-config to expose Telegram URL'
);

const apiRoot = await request('/api');
assert(apiRoot.status === 404, `Expected /api to return 404, got ${apiRoot.status}`);
assert(apiRoot.body.error === 'Not found', 'Expected /api to return JSON 404 body');

assert(
  health.headers.get('x-frame-options') === 'DENY',
  'Expected edge response to include X-Frame-Options: DENY'
);
assert(
  health.headers.get('content-security-policy')?.includes("form-action 'none'"),
  'Expected edge response to include CSP form-action restriction'
);

console.log(`Proxy smoke passed for ${baseUrl}`);
