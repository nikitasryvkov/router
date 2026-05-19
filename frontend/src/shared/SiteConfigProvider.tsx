import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultSiteConfig, type SiteConfig, validateSiteConfig } from './siteConfig';
import { SiteConfigContext } from './siteConfigContext';

type SiteConfigProviderProps = {
  children: ReactNode;
};

function reportRuntimeConfigIssue(message: string): void {
  if (import.meta.env.MODE !== 'test') {
    console.warn(`[site-config] ${message}`);
  }
}

export function SiteConfigProvider({ children }: SiteConfigProviderProps) {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRuntimeConfig() {
      try {
        const response = await fetch('/api/public-config', {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          reportRuntimeConfigIssue(
            `Runtime config request failed with HTTP ${response.status}; using fallback config.`
          );
          return;
        }

        const runtimeConfig = validateSiteConfig((await response.json()) as SiteConfig);
        setConfig(runtimeConfig);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        reportRuntimeConfigIssue(
          `Runtime config could not be loaded; using fallback config. ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    }

    void loadRuntimeConfig();

    return () => {
      controller.abort();
    };
  }, []);

  const memoizedValue = useMemo(
    () => ({
      config,
    }),
    [config]
  );

  return (
    <SiteConfigContext.Provider value={memoizedValue}>
      {children}
    </SiteConfigContext.Provider>
  );
}
