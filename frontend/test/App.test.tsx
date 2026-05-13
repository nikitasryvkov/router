import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/app/App';

describe('landing page DOM contracts', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the main heading and contact links', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Настройка роутеров, Wi-Fi и сети',
      })
    ).toBeTruthy();

    expect(
      document.querySelectorAll('a[href="https://t.me/czzttt"]').length
    ).toBeGreaterThan(0);
    expect(
      document.querySelectorAll('a[href="mailto:denis@c777.ru"]').length
    ).toBeGreaterThan(0);
  });

  it('does not render personal-data collection controls', () => {
    render(<App />);

    expect(document.querySelectorAll('form, input, textarea, select').length).toBe(0);
  });

  it('keeps aria-labelledby references valid', () => {
    render(<App />);

    const labelledElements = Array.from(
      document.querySelectorAll<HTMLElement>('[aria-labelledby]')
    );
    expect(labelledElements.length).toBeGreaterThan(0);

    for (const element of labelledElements) {
      const ids =
        element.getAttribute('aria-labelledby')?.split(/\s+/).filter(Boolean) ?? [];
      expect(ids.length).toBeGreaterThan(0);

      for (const id of ids) {
        expect(document.getElementById(id)).not.toBeNull();
      }
    }
  });

  it('sets rel for external ButtonLink instances', () => {
    render(<App />);

    const externalLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')
    );

    expect(externalLinks.length).toBeGreaterThan(0);
    for (const link of externalLinks) {
      expect(link.rel.split(/\s+/)).toContain('noreferrer');
    }
  });

  it('renders local interactive helpers without submitting data', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'нужен VPN / удаленный доступ' }));
    expect(screen.getByText('Настройка VPN / DDNS / проброса портов')).toBeTruthy();
    expect(screen.getByText('Расчет является ориентировочным. Итоговая стоимость согласовывается до начала работ.')).toBeTruthy();
  });

  it('renders FAQ as an accessible accordion with the first item open', () => {
    render(<App />);

    const firstQuestion = screen.getByRole('button', {
      name: 'Можно ли настроить роутер удаленно?',
    });
    const secondQuestion = screen.getByRole('button', {
      name: 'Какие роутеры поддерживаются?',
    });

    expect(firstQuestion.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(secondQuestion);
    expect(secondQuestion.getAttribute('aria-expanded')).toBe('true');
    expect(firstQuestion.getAttribute('aria-expanded')).toBe('false');
  });
});
