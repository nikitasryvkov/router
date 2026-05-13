import { Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
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
        <SectionHeader
          eyebrow="Подбор услуги"
          id="chooser-title"
          title="Что нужно настроить?"
          text="Выберите ближайший сценарий. Рекомендация считается локально в браузере, не отправляется на сервер и не сохраняется."
        />
        <div className={styles.layout}>
          <div className={styles.options} aria-label="Варианты задач">
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
              <span className={styles.resultLabel}>Рекомендация</span>
              <h3>{selected.recommendation}</h3>
              <strong>{selected.price}</strong>
              <p>{selected.note}</p>
              <ButtonLink
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noreferrer"
                icon={<Send size={18} aria-hidden="true" />}
              >
                Обсудить задачу в Telegram
              </ButtonLink>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
