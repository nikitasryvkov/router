import { LockKeyhole, Router, Wifi } from 'lucide-react';
import { Container } from '../components/Container/Container';
import styles from './ImportanceSection.module.css';

export function ImportanceSection() {
  return (
    <section className={styles.section} aria-labelledby="importance-title">
      <Container className={styles.layout}>
        <div>
          <p className={styles.eyebrow}>Почему это важно</p>
          <h2 id="importance-title">Стабильная сеть начинается с правильной схемы</h2>
        </div>
        <div className={styles.text}>
          <p>
            Сетевое оборудование часто работает нестабильно не из-за самого интернета, а из-за
            неправильной настройки роутера, слабого покрытия Wi-Fi, неверного размещения точек
            доступа, перегруженных каналов или неподходящего оборудования.
          </p>
          <p>
            Грамотная настройка помогает получить стабильный интернет, нормальное покрытие,
            безопасный доступ и понятную схему подключения устройств.
          </p>
          <div className={styles.points} aria-label="Что дает настройка">
            <span>
              <Wifi size={20} aria-hidden="true" /> стабильный Wi-Fi
            </span>
            <span>
              <Router size={20} aria-hidden="true" /> понятная схема
            </span>
            <span>
              <LockKeyhole size={20} aria-hidden="true" /> безопасный доступ
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
