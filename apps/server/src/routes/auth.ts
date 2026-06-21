import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { generateToken, hashToken, createSession } from '../lib/auth'
import { sendMagicLink } from '../lib/email'
import { requireAuth } from '../plugins/auth'

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /auth/request
  fastify.post<{ Body: { username: string } }>('/request', async (request, reply) => {
    const { username } = request.body ?? {}
    if (!username) {
      return reply.code(400).send({ error: 'username required' })
    }

    const user = await prisma.user.findUnique({ where: { username } })

    if (user) {
      const token = generateToken()
      const tokenHash = hashToken(token)
      const expiryMinutes = parseInt(process.env.MAGIC_LINK_EXPIRY_MINUTES ?? '15', 10)
      const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000)

      await prisma.magicLinkToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
      })

      try {
        await sendMagicLink(user.email, token, process.env.BASE_URL ?? 'http://localhost:5173')
      } catch (err) {
        fastify.log.error(err, 'Failed to send magic link email')
      }
    }

    return { message: 'Om kontot finns skickas en inloggningslänk.' }
  })

  // GET /auth/verify
  fastify.get<{ Querystring: { token: string } }>('/verify', async (request, reply) => {
    const { token } = request.query
    if (!token) {
      return reply.code(400).send({ error: 'token required' })
    }

    const tokenHash = hashToken(token)
    const magicToken = await prisma.magicLinkToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    })

    if (!magicToken) {
      return reply.code(400).send({ error: 'Invalid token' })
    }
    if (magicToken.usedAt) {
      return reply.code(400).send({ error: 'Token already used' })
    }
    if (magicToken.expiresAt < new Date()) {
      return reply.code(400).send({ error: 'Token expired' })
    }

    await prisma.magicLinkToken.update({
      where: { id: magicToken.id },
      data: { usedAt: new Date() },
    })

    const sessionToken = await createSession(magicToken.userId, request.headers['user-agent'])
    const maxAgeDays = parseInt(process.env.SESSION_MAX_AGE_DAYS ?? '180', 10)

    reply.setCookie('session', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: maxAgeDays * 24 * 60 * 60,
      path: '/',
    })

    return reply.redirect('/')
  })

  // POST /auth/logout
  fastify.post('/logout', {
    preHandler: requireAuth,
    handler: async (request, reply) => {
      const token = request.cookies?.session
      if (token) {
        const { hashToken } = await import('../lib/auth')
        const tokenHash = hashToken(token)
        await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => {})
      }
      reply.clearCookie('session', { path: '/' })
      return { ok: true }
    },
  })

  // GET /auth/me
  fastify.get('/me', {
    preHandler: requireAuth,
    handler: async (request) => {
      return request.user
    },
  })
}

export default authRoutes
