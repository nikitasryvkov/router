import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { workSteps } from '../shared/content';
import styles from './WorkProcessSection.module.css';

export function WorkProcessSection() {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-title">
      <Container>
        <SectionHeader
          eyebrow="Процесс"
          id="process-title"
          title="Как проходит работа"
          text="Коротко разбираем задачу, оборудование и формат работы, затем согласовываем стоимость до начала настройки."
        />
        <ol className={styles.steps}>
          {workSteps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.number}>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
