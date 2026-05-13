import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  eyebrow?: string;
  id?: string;
  title: string;
  text?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  id,
  title,
  text,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={[styles.header, styles[align]].join(' ')}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
}
