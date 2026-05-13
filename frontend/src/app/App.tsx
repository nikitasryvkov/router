import { LandingPage } from '../pages/LandingPage';
import { SiteConfigProvider } from '../shared/SiteConfigProvider';

export function App() {
  return (
    <SiteConfigProvider>
      <LandingPage />
    </SiteConfigProvider>
  );
}
