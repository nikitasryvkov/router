import { FaqItem } from '../components/FaqItem/FaqItem';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { faqItems } from '../shared/content';
import styles from './FaqSection.module.css';

export function FaqSection() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          id="faq-title"
          title="Частые вопросы"
          text="Короткие ответы по роутерам, Wi-Fi, Mesh-сетям, VPN, офисной технике и отсутствию формы заявки."
          align="center"
        />
        <div className={styles.list}>
          {faqItems.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
