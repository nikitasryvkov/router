import { Mail, Menu, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <Container className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="К началу страницы" onClick={() => setMenuOpen(false)}>
          <span className={styles.brandMark}>DS</span>
          <span>
            <strong>Шалякин Денис</strong>
            <small>частный сетевой специалист</small>
          </span>
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav
          className={[styles.nav, menuOpen ? styles.navOpen : ''].filter(Boolean).join(' ')}
          id="site-navigation"
          aria-label="Основная навигация"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={[styles.actions, menuOpen ? styles.actionsOpen : ''].filter(Boolean).join(' ')}>
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
