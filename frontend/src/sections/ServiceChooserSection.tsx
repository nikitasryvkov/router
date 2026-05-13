import { Mail, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { serviceSuggestions } from '../shared/content';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './ServiceChooserSection.module.css';

export function ServiceChooserSection() {
  const { config: siteConfig } = useSiteConfig();
  const [selectedId, setSelectedId] = useState(serviceSuggestions[0]?.id ?? '');
  const selected = useMemo(
    () => serviceSuggestions.find((item) => item.id === selectedId) ?? serviceSuggestions[0],
    [selectedId]
  );

  return (
    <section className={styles.section} id="chooser" aria-labelledby="chooser-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Подбор услуги"
            id="chooser-title"
            title="Что нужно настроить?"
            text="Локальный помощник показывает подходящий сценарий и ориентир по цене. Выбор не отправляется на сервер и не сохраняется."
          />
          <div className={styles.layout}>
            <div className={styles.options} role="list" aria-label="Варианты задач">
              {serviceSuggestions.map((item) => (
                <button
                  className={[styles.option, selected?.id === item.id ? styles.active : '']
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.id}
                  aria-pressed={selected?.id === item.id}
                  onClick={() => setSelectedId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {selected ? (
              <article className={styles.result} aria-live="polite">
                <span className={styles.resultLabel}>Рекомендуемый сценарий</span>
                <h3>{selected.recommendation}</h3>
                <strong>{selected.price}</strong>
                <p>{selected.note}</p>
                <div className={styles.actions}>
                  <ButtonLink
                    href={siteConfig.telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    icon={<Send size={18} aria-hidden="true" />}
                  >
                    Обсудить в Telegram
                  </ButtonLink>
                  <ButtonLink
                    href={`mailto:${siteConfig.email}`}
                    variant="ghost"
                    icon={<Mail size={18} aria-hidden="true" />}
                  >
                    Написать на почту
                  </ButtonLink>
                </div>
              </article>
            ) : null}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
