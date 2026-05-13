import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultSiteConfig, type SiteConfig, validateSiteConfig } from './siteConfig';
import { SiteConfigContext, type SiteConfigContextValue } from './siteConfigContext';

type SiteConfigProviderProps = {
  children: ReactNode;
};

export function SiteConfigProvider({ children }: SiteConfigProviderProps) {
  const [value, setValue] = useState<SiteConfigContextValue>({
    config: defaultSiteConfig,
    source: 'fallback',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadRuntimeConfig() {
      try {
        const response = await fetch('/api/public-config', {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const runtimeConfig = validateSiteConfig((await response.json()) as SiteConfig);
        setValue({ config: runtimeConfig, source: 'runtime' });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    void loadRuntimeConfig();

    return () => {
      controller.abort();
    };
  }, []);

  const memoizedValue = useMemo(
    () => ({
      config: value.config,
      source: value.source,
    }),
    [value]
  );

  return (
    <SiteConfigContext.Provider value={memoizedValue}>
      {children}
    </SiteConfigContext.Provider>
  );
}
