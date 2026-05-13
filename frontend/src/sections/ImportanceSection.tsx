import { LockKeyhole, Router, Wifi } from 'lucide-react';
import { Container } from '../components/Container/Container';
import styles from './ImportanceSection.module.css';

export function ImportanceSection() {
  return (
    <section className={styles.section} aria-labelledby="importance-title">
      <Container className={styles.layout}>
        <div>
          <p className={styles.eyebrow}>Почему это важно</p>
          <h2 id="importance-title">Нормальная сеть начинается с аккуратной настройки</h2>
        </div>
        <div className={styles.text}>
          <p>
            Неправильно настроенный роутер может снижать скорость, создавать обрывы,
            конфликтовать с устройствами, плохо покрывать помещение и оставлять сеть менее
            защищенной.
          </p>
          <p>
            Грамотная настройка помогает получить стабильный интернет, нормальное покрытие и
            понятную схему подключения устройств.
          </p>
          <div className={styles.points} aria-label="Что дает настройка">
            <span>
              <Wifi size={20} aria-hidden="true" /> стабильный Wi-Fi
            </span>
            <span>
              <Router size={20} aria-hidden="true" /> понятная схема
            </span>
            <span>
              <LockKeyhole size={20} aria-hidden="true" /> базовая защита
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
