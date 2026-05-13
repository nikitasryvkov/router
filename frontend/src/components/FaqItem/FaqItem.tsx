import { ChevronDown } from 'lucide-react';
import styles from './FaqItem.module.css';

type FaqItemProps = {
  answer: string;
  buttonId: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  question: string;
};

export function FaqItem({ answer, buttonId, isOpen, onToggle, panelId, question }: FaqItemProps) {
  return (
    <article className={[styles.item, isOpen ? styles.open : ''].filter(Boolean).join(' ')}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{question}</span>
          <ChevronDown size={20} aria-hidden="true" />
        </button>
      </h3>
      <div
        className={styles.panel}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
      >
        <p>{answer}</p>
      </div>
    </article>
  );
}
