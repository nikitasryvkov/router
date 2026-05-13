import { InfoCard } from '../components/InfoCard/InfoCard';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { services } from '../shared/content';
import styles from './Sections.module.css';

export function ServicesSection() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <Container>
        <SectionHeader
          eyebrow="Услуги"
          id="services-title"
          title="С какими задачами помогаю"
          text="От разовой настройки роутера до понятной схемы домашней сети или небольшой офисной инфраструктуры."
        />
        <div className={styles.cardGrid}>
          {services.map((service) => (
            <InfoCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
