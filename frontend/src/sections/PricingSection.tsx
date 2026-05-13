import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Container } from '../components/Container/Container';
import { prices } from '../shared/content';
import styles from './PricingSection.module.css';

export function PricingSection() {
  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <Container>
        <SectionHeader
          eyebrow="Цены"
          id="pricing-title"
          title="Стоимость работ"
          text="Цены указаны как ориентир для типовых задач. До начала настройки стоимость согласовывается заранее."
        />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.caption}>
              Тарифы на настройку роутера, Wi-Fi, Mesh, VPN и офисной сети
            </caption>
            <thead>
              <tr>
                <th scope="col">Услуга</th>
                <th scope="col">Цена</th>
                <th scope="col">Что входит</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item) => (
                <tr key={item.service}>
                  <th scope="row">{item.service}</th>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          Итоговая стоимость зависит от оборудования, сложности задачи, количества устройств
          и необходимости выезда. Перед началом работы стоимость согласовывается заранее.
        </p>
      </Container>
    </section>
  );
}
