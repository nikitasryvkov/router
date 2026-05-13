/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_EMAIL?: string;
  readonly VITE_PUBLIC_TELEGRAM_HANDLE?: string;
  readonly VITE_PUBLIC_TELEGRAM_URL?: string;
  readonly VITE_PUBLIC_OWNER_NAME?: string;
  readonly VITE_PUBLIC_INN?: string;
  readonly VITE_PUBLIC_OGRNIP?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
