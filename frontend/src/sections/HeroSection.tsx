import { Mail, Send, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { Container } from '../components/Container/Container';
import { heroBenefits } from '../shared/content';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const { config: siteConfig } = useSiteConfig();

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <img
        className={styles.heroImage}
        src="/network-workstation.svg"
        alt="Роутер, Mesh-точки и сетевое оборудование для настройки домашней или офисной сети"
      />
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>Дом и небольшой офис</p>
          <h1 id="hero-title">Настройка роутеров, Wi-Fi и сети</h1>
          <p className={styles.lead}>
            Помогу подключить интернет, настроить стабильный Wi-Fi, усилить покрытие,
            настроить роутер, Mesh-систему, VPN, гостевую сеть и оборудование для дома или
            небольшого офиса.
          </p>
          <div className={styles.actions} aria-label="Способы связи">
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
          <ul className={styles.benefits} aria-label="Преимущества работы">
            {heroBenefits.map((benefit) => (
              <li key={benefit}>
                <ShieldCheck size={18} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
