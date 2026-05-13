import { Footer } from '../sections/Footer';
import { FaqSection } from '../sections/FaqSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { Header } from '../sections/Header';
import { HeroSection } from '../sections/HeroSection';
import { ImportanceSection } from '../sections/ImportanceSection';
import { PricingSection } from '../sections/PricingSection';
import { ServicesSection } from '../sections/ServicesSection';
import { WhenToContactSection } from '../sections/WhenToContactSection';
import { WorkProcessSection } from '../sections/WorkProcessSection';

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
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
