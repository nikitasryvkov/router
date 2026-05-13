import { Footer } from '../sections/Footer';
import { FaqSection } from '../sections/FaqSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { Header } from '../sections/Header';
import { HeroSection } from '../sections/HeroSection';
import { ImportanceSection } from '../sections/ImportanceSection';
import { PricingSection } from '../sections/PricingSection';
import { CostCalculatorSection } from '../sections/CostCalculatorSection';
import { ServiceChooserSection } from '../sections/ServiceChooserSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TrustBadgesSection } from '../sections/TrustBadgesSection';
import { WhenToContactSection } from '../sections/WhenToContactSection';
import { WorkProcessSection } from '../sections/WorkProcessSection';

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBadgesSection />
        <ServicesSection />
        <ServiceChooserSection />
        <PricingSection />
        <CostCalculatorSection />
        <WorkProcessSection />
        <WhenToContactSection />
        <ImportanceSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
