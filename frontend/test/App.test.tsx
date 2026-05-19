import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';

describe('landing page DOM contracts', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('renders the main heading and contact links', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Настройка сетевого оборудования, Wi-Fi и роутеров',
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

  it('shows a local service recommendation without form submission', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Нужно покрыть Wi-Fi большую площадь.' })
    );

    expect(screen.getAllByText('Wi-Fi на большой площади').length).toBeGreaterThan(0);
    expect(screen.getAllByText('от 6 000 ₽').length).toBeGreaterThan(0);
  });

  it('uses runtime public config when the endpoint succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            ownerName: 'Runtime Owner',
            inn: '123456789012',
            ogrnip: '123456789012345',
            email: 'runtime@example.com',
            telegramHandle: '@runtime_user',
            telegramUrl: 'https://t.me/runtime_user',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      )
    );

    render(<App />);

    await waitFor(() => {
      expect(
        document.querySelectorAll('a[href="mailto:runtime@example.com"]').length
      ).toBeGreaterThan(0);
    });
    expect(
      document.querySelectorAll('a[href="https://t.me/runtime_user"]').length
    ).toBeGreaterThan(0);
  });

  it('keeps fallback public config when the endpoint fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/public-config',
        expect.objectContaining({ cache: 'no-store' })
      );
    });
    expect(
      document.querySelectorAll('a[href="mailto:denis@c777.ru"]').length
    ).toBeGreaterThan(0);
    expect(
      document.querySelectorAll('a[href="https://t.me/czzttt"]').length
    ).toBeGreaterThan(0);
  });
});
