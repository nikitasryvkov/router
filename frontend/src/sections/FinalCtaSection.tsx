import { Mail, Send } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { Container } from '../components/Container/Container';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './FinalCtaSection.module.css';

export function FinalCtaSection() {
  const { config: siteConfig } = useSiteConfig();

  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <Container className={styles.inner}>
        <div>
          <h2 id="final-cta-title">Нужна стабильная сеть без лишней сложности?</h2>
          <p>
            Напишите, какая задача стоит: модель роутера, провайдер, что не работает или что
            нужно настроить. Я подскажу возможный вариант решения и ориентир по стоимости.
          </p>
        </div>
        <div className={styles.actions}>
          <ButtonLink
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noreferrer"
            icon={<Send size={20} aria-hidden="true" />}
          >
            Написать в Telegram
          </ButtonLink>
          <ButtonLink
            href={`mailto:${siteConfig.email}`}
            variant="secondary"
            icon={<Mail size={20} aria-hidden="true" />}
          >
            Написать на почту
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
