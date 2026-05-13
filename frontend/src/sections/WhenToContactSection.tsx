import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { contactReasons } from '../shared/content';
import styles from './WhenToContactSection.module.css';

export function WhenToContactSection() {
  return (
    <section className={styles.section} aria-labelledby="when-title">
      <Container className={styles.layout}>
        <SectionHeader
          eyebrow="Ситуации"
          id="when-title"
          title="Когда стоит обратиться"
          text="Если сеть нужна для дома, офиса или коммерческого помещения, важно проверить не только пароль Wi-Fi, но и оборудование, покрытие, схему подключения и реальные задачи."
        />
        <ul className={styles.list}>
          {contactReasons.map(({ text, icon: Icon }) => (
            <li key={text}>
              <Icon size={20} aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
