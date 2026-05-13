# Лендинг частного сетевого специалиста

Одностраничный сайт для ИП Шалякина Дениса Андреевича: настройка роутеров, Wi-Fi,
Mesh, VPN, домашней и небольшой офисной сети.

## Что важно по данным пользователей

Сайт не собирает персональные данные через формы, cookies, аналитику или
встроенные трекеры. В текущей версии нет заявок, регистрации, личного кабинета,
чата, обратного звонка, reCAPTCHA и клиентских идентификаторов.

Связь сделана только через внешние каналы:

- `mailto:denis@c777.ru`
- `https://t.me/czzttt`

Backend используется только как технический слой: health-check, публичная
конфигурация и безопасная HTTP-конфигурация. Он не принимает и не сохраняет
обращения пользователей.

## Структура

```text
frontend/   React + TypeScript + Vite, CSS Modules, статический лендинг
backend/    Express + TypeScript, health-check и публичная конфигурация
nginx/      reverse proxy, security headers, production HTTPS пример
```

## Локальный запуск без Docker

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
npm --prefix frontend run dev
npm --prefix backend run dev
```

Frontend будет доступен на `http://localhost:5173`, backend на
`http://localhost:8080`.

## Локальный запуск через Docker Compose

```bash
docker compose up --build
```

Сайт будет доступен на `http://localhost:8080`.

## Проверки качества

```bash
npm --prefix frontend run lint
npm --prefix frontend run typecheck
npm --prefix frontend run test
npm --prefix frontend run build

npm --prefix backend run lint
npm --prefix backend run typecheck
npm --prefix backend run test
npm --prefix backend run build
npm run format:check
```

Для проверки связки через reverse proxy после запуска Docker Compose:

```bash
npm run test:e2e:proxy
```

## Переменные окружения

Для frontend используются build-time переменные `VITE_PUBLIC_*`, для backend
используются `PUBLIC_*`.

```env
PUBLIC_EMAIL=denis@c777.ru
PUBLIC_TELEGRAM_HANDLE=@czzttt
PUBLIC_TELEGRAM_URL=https://t.me/czzttt
PUBLIC_OWNER_NAME=ИП Шалякин Денис Андреевич
PUBLIC_INN=233010036207
PUBLIC_OGRNIP=322237500360850
```

Примеры лежат в `frontend/.env.example` и `backend/.env.example`.

## HTTPS

Для локального Docker Compose используется HTTP на `localhost`. Для production
нужно включить HTTPS на reverse proxy. В `nginx/nginx.https.conf` есть пример
конфигурации с TLS, HSTS и редиректом с HTTP на HTTPS. Сертификаты ожидаются в:

```text
nginx/certs/fullchain.pem
nginx/certs/privkey.pem
```

Для production-контура с HTTPS используйте отдельный compose-файл:

```bash
docker compose -f docker-compose.prod.yml up --build
```

## Security-подход

- CSP запрещает внешние скрипты, формы, frames и object-вставки.
- CORS не открывается.
- Nginx пропускает к `/api/` только `GET`.
- Express отключает `x-powered-by` и ставит security headers через Helmet.
- Серверные логи технические: request id при наличии, метод, путь, статус и
  длительность, без cookies, IP-адреса, User-Agent и поведенческой аналитики.
- Nginx access log пишет путь без query string.
