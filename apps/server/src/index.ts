import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { z } from 'zod'
import path from 'path'
import fs from 'fs'

import authPlugin from './plugins/auth'
import authRoutes from './routes/auth'
import tripRoutes from './routes/trips'
import dayRoutes from './routes/days'
import agendaRoutes from './routes/agenda'
import accommodationRoutes from './routes/accommodations'
import transportRoutes from './routes/transport'
import ticketRoutes from './routes/tickets'
import todoRoutes from './routes/todos'
import reminderRoutes from './routes/reminders'
import mediaRoutes from './routes/media'
import fileRoutes from './routes/files'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  BASE_URL: z.string().default('http://localhost:3000'),
  SESSION_SECRET: z.string().default('change-me'),
  SESSION_MAX_AGE_DAYS: z.string().default('180'),
  MAGIC_LINK_EXPIRY_MINUTES: z.string().default('15'),
  SMTP_HOST: z.string().default('localhost'),
  SMTP_PORT: z.string().default('587'),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  SMTP_FROM: z.string().default('Reseboken <noreply@example.com>'),
  STORAGE_PATH: z.string().default('./data/uploads'),
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
})

const env = envSchema.parse(process.env)

const fastify = Fastify({ logger: true })

async function main() {
  await fastify.register(fastifyHelmet, { contentSecurityPolicy: false })
  await fastify.register(fastifyCors, {
    origin: env.BASE_URL,
    credentials: true,
  })
  await fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })
  await fastify.register(fastifyCookie)
  await fastify.register(fastifyMultipart, { limits: { fileSize: 50 * 1024 * 1024 } })

  const storagePath = path.resolve(env.STORAGE_PATH)
  await fs.promises.mkdir(storagePath, { recursive: true })

  await fastify.register(fastifyStatic, {
    root: storagePath,
    prefix: '/uploads/',
    decorateReply: false,
  })

  await fastify.register(authPlugin)

  // Register routes
  await fastify.register(authRoutes, { prefix: '/api/auth' })
  await fastify.register(tripRoutes, { prefix: '/api/trips' })
  await fastify.register(dayRoutes, { prefix: '/api' })
  await fastify.register(agendaRoutes, { prefix: '/api' })
  await fastify.register(accommodationRoutes, { prefix: '/api' })
  await fastify.register(transportRoutes, { prefix: '/api' })
  await fastify.register(ticketRoutes, { prefix: '/api' })
  await fastify.register(todoRoutes, { prefix: '/api' })
  await fastify.register(reminderRoutes, { prefix: '/api' })
  await fastify.register(mediaRoutes, { prefix: '/api' })
  await fastify.register(fileRoutes, { prefix: '/api' })

  const port = parseInt(env.PORT, 10)
  await fastify.listen({ port, host: '0.0.0.0' })
  fastify.log.info(`Server running on port ${port}`)
}

main().catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
