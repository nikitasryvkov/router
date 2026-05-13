import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { ServiceCard } from '../components/ServiceCard/ServiceCard';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { services } from '../shared/content';
import styles from './Sections.module.css';

export function ServicesSection() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Услуги"
            id="services-title"
            title="С какими задачами помогаю"
            text="Наведите на карточку, чтобы увидеть подходящий сценарий, или раскройте ее, чтобы посмотреть состав работ."
          />
          <div className={styles.cardGrid}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
