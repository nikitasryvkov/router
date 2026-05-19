export type PublicSiteConfig = {
  ownerName: string;
  inn: string;
  ogrnip: string;
  email: string;
  telegramHandle: string;
  telegramUrl: string;
};

export type TrustProxyConfig = boolean | number;

export type ServerConfig = {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  trustProxy: TrustProxyConfig;
  publicConfig: PublicSiteConfig;
};

const TELEGRAM_HOSTS = new Set(['t.me', 'telegram.me']);

function readString(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function readPort(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 && value < 65536 ? value : fallback;
}

function readTrustProxy(name: string, fallback: TrustProxyConfig): TrustProxyConfig {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) {
    return fallback;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  const hopCount = Number(value);
  if (Number.isInteger(hopCount) && hopCount >= 0 && hopCount <= 10) {
    return hopCount;
  }

  throw new Error(`${name} must be false, true, or an integer from 0 to 10`);
}

function readNodeEnv(): ServerConfig['nodeEnv'] {
  const value = process.env.NODE_ENV;
  if (value === 'development' || value === 'test' || value === 'production') {
    return value;
  }

  return 'production';
}

function validatePublicConfig(config: PublicSiteConfig): void {
  const errors: string[] = [];

  if (config.ownerName.length < 2 || config.ownerName.length > 200) {
    errors.push('PUBLIC_OWNER_NAME must be between 2 and 200 characters');
  }

  if (!/^\d{12}$/.test(config.inn)) {
    errors.push('PUBLIC_INN must contain exactly 12 digits');
  }

  if (!/^\d{15}$/.test(config.ogrnip)) {
    errors.push('PUBLIC_OGRNIP must contain exactly 15 digits');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    errors.push('PUBLIC_EMAIL must be a valid email address');
  }

  if (!/^@[A-Za-z0-9_]{5,32}$/.test(config.telegramHandle)) {
    errors.push('PUBLIC_TELEGRAM_HANDLE must be a Telegram handle like @username');
  }

  try {
    const telegramUrl = new URL(config.telegramUrl);
    if (telegramUrl.protocol !== 'https:' || !TELEGRAM_HOSTS.has(telegramUrl.hostname)) {
      errors.push('PUBLIC_TELEGRAM_URL must be an HTTPS Telegram URL');
    }
  } catch {
    errors.push('PUBLIC_TELEGRAM_URL must be a valid URL');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid server configuration: ${errors.join('; ')}`);
  }
}

function createServerConfig(): ServerConfig {
  const publicConfig: PublicSiteConfig = {
    ownerName: readString('PUBLIC_OWNER_NAME', 'ИП Шалякин Денис Андреевич'),
    inn: readString('PUBLIC_INN', '233010036207'),
    ogrnip: readString('PUBLIC_OGRNIP', '322237500360850'),
    email: readString('PUBLIC_EMAIL', 'denis@c777.ru'),
    telegramHandle: readString('PUBLIC_TELEGRAM_HANDLE', '@czzttt'),
    telegramUrl: readString('PUBLIC_TELEGRAM_URL', 'https://t.me/czzttt'),
  };

  validatePublicConfig(publicConfig);

  return {
    nodeEnv: readNodeEnv(),
    port: readPort('PORT', 8080),
    trustProxy: readTrustProxy('TRUST_PROXY', 1),
    publicConfig,
  };
}

export const serverConfig: ServerConfig = createServerConfig();
