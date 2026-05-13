import type { LucideIcon } from 'lucide-react';
import styles from './InfoCard.module.css';

type InfoCardProps = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export function InfoCard({ title, text, icon: Icon }: InfoCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
