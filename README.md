# Reseboken

En mobile-first reseapp för familjebruk. Passwordless inloggning, daglig agenda, karta, biljetter, boenden och todos – allt under en resa.

## Snabbstart (lokal)

```bash
# 1. Installera beroenden
npm install

# 2. Konfigurera miljövariabler
cp apps/server/.env.example apps/server/.env
# Redigera apps/server/.env med dina SMTP-uppgifter och ett SESSION_SECRET

# 3. Kör databasmigrationer
cd apps/server
npx prisma migrate deploy   # eller: npx prisma migrate dev (skapar migration)

# 4. Seed-data (3 användare + exempelresa)
npm run db:seed

# 5. Starta backend + frontend (i rot-mappen)
cd ../..
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:3000

## Användare (seed)

| Användarnamn | E-post | Roll |
|---|---|---|
| `anna` | anna@example.com | EDITOR |
| `bjorn` | bjorn@example.com | EDITOR |
| `carl` | carl@example.com | VIEWER |

> Ändra e-postadresser i `apps/server/prisma/seed.ts` innan du kör seed.

## Inloggning

1. Gå till `/login` och ange ditt **användarnamn**.
2. En inloggningslänk skickas till din registrerade e-post.
3. Klicka på länken → du är inloggad i 180 dagar.

## Docker (produktion)

```bash
# Skapa .env i projektets rot
cat > .env << 'EOF'
BASE_URL=https://resa.dittforetag.se
DOMAIN=resa.dittforetag.se
SESSION_SECRET=ett-langt-slumpmassigt-hemligt-varde
SMTP_HOST=smtp.dittforetag.se
SMTP_PORT=587
SMTP_USER=noreply@dittforetag.se
SMTP_PASS=ditt-smtp-losenord
SMTP_FROM=Reseboken <noreply@dittforetag.se>
EOF

# Bygg och starta
docker compose up -d

# Kör migrationer + seed
docker compose exec app node -e "
const { execSync } = require('child_process');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });
"
```

Caddy sköter TLS automatiskt via Let's Encrypt.

## Backup

SQLite-databasen och uppladdade filer ligger i Docker-volymen `reseboken-data`.

```bash
# Backup
docker run --rm -v reseboken-data:/data -v $(pwd):/backup alpine \
  tar czf /backup/reseboken-backup-$(date +%Y%m%d).tar.gz /data

# Återställ
docker run --rm -v reseboken-data:/data -v $(pwd):/backup alpine \
  tar xzf /backup/reseboken-backup-DATUM.tar.gz -C /
```

## Projektstruktur

```
apps/
  server/         Fastify + Prisma + SQLite
    prisma/       Schema + migrationer + seed
    src/
      lib/        auth, email, prisma-client
      plugins/    auth-plugin (session-cookie + RBAC)
      routes/     En fil per resurs
      __tests__/  auth + RBAC-tester
  web/            React + Vite + TanStack Query
    src/
      api/        Query/mutation-hooks per resurs
      components/ BottomNav, TripSelector, SaveIndicator
      pages/      TodayPage, OverviewPage, ...
      store/      Zustand (aktivt resa-ID, sparstatus)
packages/
  shared/         Zod-scheman och TypeScript-typer
```

## Tester

```bash
cd apps/server
npm test
```

## Linting

```bash
# Installera eslint om det saknas
npx eslint apps/server/src --ext .ts
npx tsc --noEmit --project apps/server/tsconfig.json
npx tsc --noEmit --project apps/web/tsconfig.json
```
