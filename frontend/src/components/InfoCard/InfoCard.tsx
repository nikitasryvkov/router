import type { LucideIcon } from 'lucide-react';
import styles from './InfoCard.module.css';

type InfoCardProps = {
  title: string;
  text: string;
  items?: string[];
  icon: LucideIcon;
};

export function InfoCard({ title, text, items, icon: Icon }: InfoCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {items && items.length > 0 ? (
        <div className={styles.includes}>
          <strong>Что входит</strong>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
