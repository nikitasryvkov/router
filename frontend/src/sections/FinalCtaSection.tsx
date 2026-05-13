import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { Container } from '../components/Container/Container';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './FinalCtaSection.module.css';

export function FinalCtaSection() {
  const { config: siteConfig } = useSiteConfig();
  const [hint, setHint] = useState('Выберите удобный внешний канал связи');

  return (
    <section className={styles.section} id="contacts" aria-labelledby="final-cta-title">
      <Container className={styles.inner}>
        <ScrollReveal className={styles.copy}>
          <h2 id="final-cta-title">Нужна стабильная сеть без лишней сложности?</h2>
          <p>
            Напишите, какая задача стоит: модель роутера, провайдер, что не работает или что
            нужно настроить. Я подскажу возможный вариант решения и ориентир по стоимости.
          </p>
        </ScrollReveal>
        <ScrollReveal className={styles.contactPanel} delay={90}>
          <div className={styles.actions} aria-label="Контакты">
            <ButtonLink
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noreferrer"
              icon={<Send size={20} aria-hidden="true" />}
              onMouseEnter={() => setHint('Откроется Telegram')}
              onFocus={() => setHint('Откроется Telegram')}
              onClick={() => setHint('Откроется Telegram')}
            >
              Написать в Telegram
            </ButtonLink>
            <ButtonLink
              href={`mailto:${siteConfig.email}`}
              variant="secondary"
              icon={<Mail size={20} aria-hidden="true" />}
              onMouseEnter={() => setHint('Откроется почтовый клиент')}
              onFocus={() => setHint('Откроется почтовый клиент')}
              onClick={() => setHint('Откроется почтовый клиент')}
            >
              Написать на почту
            </ButtonLink>
          </div>
          <p className={styles.hint} aria-live="polite">
            {hint}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
