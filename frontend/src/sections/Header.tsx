import { Mail, Send } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { Container } from '../components/Container/Container';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './Header.module.css';

const navItems = [
  { href: '#services', label: 'Услуги' },
  { href: '#pricing', label: 'Цены' },
  { href: '#process', label: 'Как работаю' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header() {
  const { config: siteConfig } = useSiteConfig();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="К началу страницы">
          <span className={styles.brandMark}>DS</span>
          <span>
            <strong>Шалякин Денис</strong>
            <small>частный сетевой специалист</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <ButtonLink
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<Send size={18} aria-hidden="true" />}
          >
            Telegram
          </ButtonLink>
          <a
            className={styles.mailLink}
            href={`mailto:${siteConfig.email}`}
            aria-label={`Написать на почту ${siteConfig.email}`}
          >
            <Mail size={19} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </header>
  );
}
