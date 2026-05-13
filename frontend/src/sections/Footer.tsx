import { Mail, Send } from 'lucide-react';
import { Container } from '../components/Container/Container';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './Footer.module.css';

export function Footer() {
  const { config: siteConfig } = useSiteConfig();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.legal}>
          <strong>{siteConfig.ownerName}</strong>
          <span>ИНН {siteConfig.inn}</span>
          <span>ОГРН/ОГРНИП {siteConfig.ogrnip}</span>
        </div>
        <address className={styles.contacts}>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={18} aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a href={siteConfig.telegramUrl} target="_blank" rel="noreferrer">
            <Send size={18} aria-hidden="true" />
            {siteConfig.telegramHandle}
          </a>
        </address>
        <p className={styles.notice}>
          Сайт носит информационный характер и не осуществляет сбор персональных данных
          через формы, cookies, аналитику или встроенные трекеры. Для связи пользователь
          самостоятельно переходит во внешний почтовый клиент или Telegram.
        </p>
        <p className={styles.shortNotice}>
          Сайт не использует формы, cookies, аналитику и встроенные трекеры. Сайт не
          осуществляет сбор персональных данных через интерфейс.
        </p>
      </Container>
    </footer>
  );
}
