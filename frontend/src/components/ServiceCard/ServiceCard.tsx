import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { ServiceContent } from '../../shared/content';
import styles from './ServiceCard.module.css';

export function ServiceCard({ title, text, fit, details, icon: Icon }: ServiceContent) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={[styles.card, open ? styles.open : ''].filter(Boolean).join(' ')}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.icon} aria-hidden="true">
          <Icon size={23} strokeWidth={2.15} />
        </span>
        <span className={styles.body}>
          <span className={styles.title}>{title}</span>
          <span className={styles.text}>{text}</span>
          <span className={styles.fit}>{fit}</span>
        </span>
        <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
      </button>
      <div id={panelId} className={styles.details} aria-hidden={!open}>
        <ul>
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
