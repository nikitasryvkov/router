import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { Container } from '../components/Container/Container';
import { trustBadges } from '../shared/content';
import styles from './TrustBadgesSection.module.css';

export function TrustBadgesSection() {
  return (
    <section className={styles.section} aria-labelledby="trust-title">
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Принципы работы</p>
            <h2 id="trust-title">Без скрытого сбора данных и лишней сложности</h2>
          </div>
          <ul className={styles.badges} aria-label="Факторы доверия">
            {trustBadges.map(({ label, text, icon: Icon }, index) => {
              const hintId = `trust-badge-${index}`;

              return (
                <li key={label}>
                  <button className={styles.badge} type="button" aria-describedby={hintId}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                  <span className={styles.tooltip} id={hintId} role="tooltip">
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
