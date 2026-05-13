import { Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { calculatorTasks } from '../shared/content';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './CostCalculatorSection.module.css';

type WorkFormat = 'remote' | 'visit';
type Complexity = 'basic' | 'advanced';

const currencyFormatter = new Intl.NumberFormat('ru-RU');

function roundToHundreds(value: number) {
  return Math.round(value / 100) * 100;
}

export function CostCalculatorSection() {
  const { config: siteConfig } = useSiteConfig();
  const [taskId, setTaskId] = useState(calculatorTasks[1]?.id ?? calculatorTasks[0]?.id ?? '');
  const [points, setPoints] = useState(1);
  const [format, setFormat] = useState<WorkFormat>('remote');
  const [complexity, setComplexity] = useState<Complexity>('basic');

  const selectedTask = useMemo(
    () => calculatorTasks.find((item) => item.id === taskId) ?? calculatorTasks[0],
    [taskId]
  );

  const range = useMemo(() => {
    const base = selectedTask?.base ?? 0;
    const pointExtra = Math.max(0, points - 1) * 900;
    const formatExtra = format === 'visit' ? 1000 : 0;
    const complexityMultiplier = complexity === 'advanced' ? 1.35 : 1;
    const min = roundToHundreds((base + pointExtra + formatExtra) * complexityMultiplier);
    const spread = complexity === 'advanced' ? 1800 : 1200;
    const max = roundToHundreds(min + spread + pointExtra * 0.35);

    return `${currencyFormatter.format(min)}–${currencyFormatter.format(max)} ₽`;
  }, [complexity, format, points, selectedTask]);

  return (
    <section className={styles.section} id="calculator" aria-labelledby="calculator-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Оценка стоимости"
            id="calculator-title"
            title="Мини-калькулятор без отправки данных"
            text="Выборы обрабатываются только в браузере. На сервер не отправляются тип задачи, формат работ, количество устройств или другие сценарии."
          />
          <div className={styles.panel}>
            <div className={styles.controls}>
              <fieldset className={styles.group}>
                <legend>Тип задачи</legend>
                <div className={styles.chips}>
                  {calculatorTasks.map((task) => (
                    <button
                      className={[styles.chip, task.id === taskId ? styles.selected : '']
                        .filter(Boolean)
                        .join(' ')}
                      type="button"
                      key={task.id}
                      aria-pressed={task.id === taskId}
                      onClick={() => setTaskId(task.id)}
                    >
                      {task.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.group}>
                <legend>Количество роутеров / точек доступа</legend>
                <div className={styles.stepper} aria-label="Количество устройств">
                  <button type="button" onClick={() => setPoints((value) => Math.max(1, value - 1))}>
                    −
                  </button>
                  <output aria-live="polite">{points}</output>
                  <button type="button" onClick={() => setPoints((value) => Math.min(6, value + 1))}>
                    +
                  </button>
                </div>
              </fieldset>

              <fieldset className={styles.group}>
                <legend>Формат работы</legend>
                <div className={styles.segment}>
                  <button
                    type="button"
                    className={format === 'remote' ? styles.selected : ''}
                    aria-pressed={format === 'remote'}
                    onClick={() => setFormat('remote')}
                  >
                    удаленно
                  </button>
                  <button
                    type="button"
                    className={format === 'visit' ? styles.selected : ''}
                    aria-pressed={format === 'visit'}
                    onClick={() => setFormat('visit')}
                  >
                    выезд
                  </button>
                </div>
              </fieldset>

              <fieldset className={styles.group}>
                <legend>Сложность</legend>
                <div className={styles.segment}>
                  <button
                    type="button"
                    className={complexity === 'basic' ? styles.selected : ''}
                    aria-pressed={complexity === 'basic'}
                    onClick={() => setComplexity('basic')}
                  >
                    базовая
                  </button>
                  <button
                    type="button"
                    className={complexity === 'advanced' ? styles.selected : ''}
                    aria-pressed={complexity === 'advanced'}
                    onClick={() => setComplexity('advanced')}
                  >
                    расширенная
                  </button>
                </div>
              </fieldset>
            </div>

            <aside className={styles.summary} aria-live="polite" aria-labelledby="estimate-title">
              <span>Ориентировочный диапазон</span>
              <h3 id="estimate-title">{range}</h3>
              <p>Расчет является ориентировочным. Итоговая стоимость согласовывается до начала работ.</p>
              <ButtonLink
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noreferrer"
                icon={<Send size={18} aria-hidden="true" />}
              >
                Обсудить задачу
              </ButtonLink>
            </aside>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
