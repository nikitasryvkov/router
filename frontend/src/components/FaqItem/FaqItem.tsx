import { ChevronDown } from 'lucide-react';
import styles from './FaqItem.module.css';

type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className={styles.item}>
      <summary>
        <span>{question}</span>
        <ChevronDown size={20} aria-hidden="true" />
      </summary>
      <p>{answer}</p>
    </details>
  );
}
