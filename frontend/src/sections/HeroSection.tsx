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
      <div className={styles.networkScheme} aria-hidden="true">
        <span className={styles.routerNode} />
        <span className={styles.wifiNode} />
        <span className={styles.meshNode} />
        <span className={styles.officeNode} />
      </div>
      <img
        className={styles.heroImage}
        src="/network-workstation.svg"
        alt="Роутер, Mesh-точки и сетевое оборудование для настройки домашней или офисной сети"
      />
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={[styles.kicker, styles.revealOne].join(' ')}>Дом и небольшой офис</p>
          <h1 className={styles.revealTwo} id="hero-title">
            Настройка роутеров, Wi-Fi и сети
          </h1>
          <p className={[styles.lead, styles.revealThree].join(' ')}>
            Помогу подключить интернет, настроить стабильный Wi-Fi, усилить покрытие,
            настроить роутер, Mesh-систему, VPN, гостевую сеть и оборудование для дома или
            небольшого офиса.
          </p>
          <div className={[styles.actions, styles.revealFour].join(' ')} aria-label="Способы связи">
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
