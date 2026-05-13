import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import styles from './ScrollReveal.module.css';

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

function shouldShowImmediately() {
  if (typeof window === 'undefined') {
    return true;
  }

  return (
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  );
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(shouldShowImmediately);

  useEffect(() => {
    if (visible) {
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 12% 0px', threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={[styles.reveal, visible ? styles.visible : '', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
