import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import cookie from '@fastify/cookie'
import authPlugin from '../plugins/auth'
import authRoutes from '../routes/auth'

let testApp: FastifyInstance

beforeAll(async () => {
  testApp = Fastify()
  await testApp.register(cookie)
  await testApp.register(authPlugin)
  await testApp.register(authRoutes, { prefix: '/api/auth' })
  await testApp.ready()
})

afterAll(async () => {
  await testApp?.close()
})

describe('Auth - magic link request', () => {
  it('returns 200 with neutral message for unknown username', async () => {
    const res = await testApp.inject({
      method: 'POST',
      url: '/api/auth/request',
      body: { username: 'nonexistent_user_xyz' },
    })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.message).toBeTruthy()
  })

  it('returns 400 without username', async () => {
    const res = await testApp.inject({
      method: 'POST',
      url: '/api/auth/request',
      body: {},
    })
    expect(res.statusCode).toBe(400)
  })

  it('gives same response for existing and non-existing users (timing-safe)', async () => {
    const [r1, r2] = await Promise.all([
      testApp.inject({ method: 'POST', url: '/api/auth/request', body: { username: 'anna' } }),
      testApp.inject({ method: 'POST', url: '/api/auth/request', body: { username: 'nobody' } }),
    ])
    expect(r1.statusCode).toBe(200)
    expect(r2.statusCode).toBe(200)
    expect(r1.json().message).toBe(r2.json().message)
  })
})

describe('Auth - verify token', () => {
  it('returns 400 for invalid token', async () => {
    const res = await testApp.inject({ method: 'GET', url: '/api/auth/verify?token=badtoken' })
    expect(res.statusCode).toBe(400)
  })

  it('returns 400 without token', async () => {
    const res = await testApp.inject({ method: 'GET', url: '/api/auth/verify' })
    expect(res.statusCode).toBe(400)
  })
})

describe('Auth - /me requires auth', () => {
  it('returns 401 without session cookie', async () => {
    const res = await testApp.inject({ method: 'GET', url: '/api/auth/me' })
    expect(res.statusCode).toBe(401)
  })

  it('returns 401 with invalid session cookie', async () => {
    const res = await testApp.inject({
      method: 'GET',
      url: '/api/auth/me',
      cookies: { session: 'not-a-real-session-token' },
    })
    expect(res.statusCode).toBe(401)
  })
})

describe('Auth - logout', () => {
  it('returns 401 without session', async () => {
    const res = await testApp.inject({ method: 'POST', url: '/api/auth/logout' })
    expect(res.statusCode).toBe(401)
  })
})
