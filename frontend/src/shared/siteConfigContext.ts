import { createContext, useContext } from 'react';
import { defaultSiteConfig, type SiteConfig } from './siteConfig';

export type SiteConfigContextValue = {
  config: SiteConfig;
  source: 'fallback' | 'runtime';
};

export const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: defaultSiteConfig,
  source: 'fallback',
});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
