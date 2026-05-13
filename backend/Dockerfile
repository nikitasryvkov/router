FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY static ./static
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/static ./static

USER appuser

EXPOSE 8080

CMD ["node", "dist/server.js"]

