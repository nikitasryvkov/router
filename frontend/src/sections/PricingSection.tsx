import { CheckCircle2, Send } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { prices } from '../shared/content';
import { useSiteConfig } from '../shared/siteConfigContext';
import styles from './PricingSection.module.css';

export function PricingSection() {
  const { config: siteConfig } = useSiteConfig();

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Цены"
            id="pricing-title"
            title="Стоимость работ"
            text="Тарифные карточки помогают быстро сопоставить задачу, состав работ и ориентир по цене."
          />
          <div className={styles.cards}>
            {prices.map((item) => (
              <article
                className={[styles.card, item.highlighted ? styles.highlighted : ''].filter(Boolean).join(' ')}
                key={item.service}
              >
                {item.highlighted ? <span className={styles.marker}>частый запрос</span> : null}
                <h3>{item.service}</h3>
                <strong>{item.price}</strong>
                <p>{item.description}</p>
                <ul>
                  {item.includes.map((include) => (
                    <li key={include}>
                      <CheckCircle2 size={17} aria-hidden="true" />
                      <span>{include}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={siteConfig.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant={item.highlighted ? 'primary' : 'ghost'}
                  icon={<Send size={18} aria-hidden="true" />}
                >
                  Обсудить задачу
                </ButtonLink>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Итоговая стоимость зависит от оборудования, сложности задачи, количества устройств и необходимости выезда.
            Перед началом работы стоимость согласовывается заранее.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
