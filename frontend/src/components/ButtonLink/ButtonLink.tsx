import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ButtonLink.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({
  children,
  className,
  icon,
  rel,
  target,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const safeRel = target === '_blank' ? (rel ?? 'noreferrer') : rel;

  return (
    <a
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
      rel={safeRel}
      target={target}
      {...props}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}
