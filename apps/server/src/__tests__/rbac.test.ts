import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import { PrismaClient } from '@prisma/client'
import authPlugin, { requireAuth, requireEditor } from '../plugins/auth'

const prisma = new PrismaClient({
  datasources: { db: { url: 'file::memory:?cache=shared&mode=memory' } },
})

let app: ReturnType<typeof Fastify>

beforeAll(async () => {
  app = Fastify()
  await app.register(cookie)
  await app.register(authPlugin)

  // Test route that requires auth
  app.get('/test/auth', { preHandler: requireAuth }, async (req) => ({ ok: true, role: req.user?.role }))
  // Test route that requires editor
  app.post('/test/editor', { preHandler: requireEditor }, async (req) => ({ ok: true }))

  await app.ready()
})

afterAll(async () => {
  await app.close()
  await prisma.$disconnect()
})

describe('RBAC middleware', () => {
  it('requireAuth returns 401 with no cookie', async () => {
    const res = await app.inject({ method: 'GET', url: '/test/auth' })
    expect(res.statusCode).toBe(401)
  })

  it('requireAuth returns 401 with invalid session cookie', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/test/auth',
      cookies: { session: 'invalid-token' },
    })
    expect(res.statusCode).toBe(401)
  })

  it('requireEditor returns 401 with no cookie', async () => {
    const res = await app.inject({ method: 'POST', url: '/test/editor' })
    expect(res.statusCode).toBe(401)
  })
})
