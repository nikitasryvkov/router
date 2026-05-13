import { useState } from 'react';
import { FaqItem } from '../components/FaqItem/FaqItem';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { faqItems } from '../shared/content';
import styles from './FaqSection.module.css';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="FAQ"
            id="faq-title"
            title="Частые вопросы"
            text="Короткие ответы по удаленной настройке, моделям роутеров, подготовке и отсутствию формы заявки."
            align="center"
          />
          <div className={styles.list}>
            {faqItems.map((item, index) => (
              <FaqItem
                key={item.question}
                {...item}
                buttonId={`faq-button-${index}`}
                panelId={`faq-panel-${index}`}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
              />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
