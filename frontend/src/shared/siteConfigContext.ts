import { createContext, useContext } from 'react';
import { defaultSiteConfig, type SiteConfig } from './siteConfig';

export type SiteConfigContextValue = {
  config: SiteConfig;
};

export const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: defaultSiteConfig,
});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
