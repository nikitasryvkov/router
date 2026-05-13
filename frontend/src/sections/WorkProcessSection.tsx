import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { workSteps } from '../shared/content';
import styles from './WorkProcessSection.module.css';

export function WorkProcessSection() {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Процесс"
            id="process-title"
            title="Как проходит работа"
            text="Без формы заявки на сайте: только внешняя связь через Telegram или email, где вы сами решаете, что отправлять."
          />
          <ol className={styles.steps}>
            {workSteps.map((step, index) => (
              <li key={step.title} style={{ transitionDelay: `${index * 55}ms` }}>
                <span className={styles.number}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </section>
  );
}
