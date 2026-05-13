const env = import.meta.env;

export type SiteConfig = {
  ownerName: string;
  inn: string;
  ogrnip: string;
  email: string;
  telegramHandle: string;
  telegramUrl: string;
};

const TELEGRAM_HOSTS = new Set(['t.me', 'telegram.me']);

export function validateSiteConfig(config: SiteConfig): SiteConfig {
  const errors: string[] = [];

  if (config.ownerName.trim().length < 2 || config.ownerName.length > 200) {
    errors.push('VITE_PUBLIC_OWNER_NAME must be between 2 and 200 characters');
  }

  if (!/^\d{12}$/.test(config.inn)) {
    errors.push('VITE_PUBLIC_INN must contain exactly 12 digits');
  }

  if (!/^\d{15}$/.test(config.ogrnip)) {
    errors.push('VITE_PUBLIC_OGRNIP must contain exactly 15 digits');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    errors.push('VITE_PUBLIC_EMAIL must be a valid email address');
  }

  if (!/^@[A-Za-z0-9_]{5,32}$/.test(config.telegramHandle)) {
    errors.push('VITE_PUBLIC_TELEGRAM_HANDLE must be a Telegram handle like @username');
  }

  try {
    const telegramUrl = new URL(config.telegramUrl);
    if (telegramUrl.protocol !== 'https:' || !TELEGRAM_HOSTS.has(telegramUrl.hostname)) {
      errors.push('VITE_PUBLIC_TELEGRAM_URL must be an HTTPS Telegram URL');
    }
  } catch {
    errors.push('VITE_PUBLIC_TELEGRAM_URL must be a valid URL');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid frontend configuration: ${errors.join('; ')}`);
  }

  return config;
}

export const defaultSiteConfig = validateSiteConfig({
  ownerName: env.VITE_PUBLIC_OWNER_NAME ?? 'ИП Шалякин Денис Андреевич',
  inn: env.VITE_PUBLIC_INN ?? '233010036207',
  ogrnip: env.VITE_PUBLIC_OGRNIP ?? '322237500360850',
  email: env.VITE_PUBLIC_EMAIL ?? 'denis@c777.ru',
  telegramHandle: env.VITE_PUBLIC_TELEGRAM_HANDLE ?? '@czzttt',
  telegramUrl: env.VITE_PUBLIC_TELEGRAM_URL ?? 'https://t.me/czzttt',
});
