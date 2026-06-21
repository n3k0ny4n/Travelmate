FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

FROM base AS deps
RUN npm ci

FROM deps AS builder
COPY . .
RUN npm run build --workspace=packages/shared 2>/dev/null || true
RUN npm run build --workspace=apps/web
WORKDIR /app/apps/server
RUN npx prisma generate
RUN npx tsc

FROM node:22-alpine AS server
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/node_modules ./apps/server/node_modules
COPY --from=builder /app/apps/web/dist ./public
RUN mkdir -p /data/uploads

EXPOSE 3000
CMD ["node", "dist/index.js"]
