import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { getSessionUser } from '../lib/auth'
import { User } from '@prisma/client'

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null
  }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)

  fastify.addHook('preHandler', async (request: FastifyRequest) => {
    const token = request.cookies?.session
    if (token) {
      const user = await getSessionUser(token)
      request.user = user
    }
  })
}

export default fp(authPlugin)

export function requireAuth(request: FastifyRequest, reply: any, done: () => void) {
  if (!request.user) {
    reply.code(401).send({ error: 'Unauthorized' })
    return
  }
  done()
}

export function requireEditor(request: FastifyRequest, reply: any, done: () => void) {
  if (!request.user) {
    reply.code(401).send({ error: 'Unauthorized' })
    return
  }
  if (request.user.role !== 'EDITOR') {
    reply.code(403).send({ error: 'Forbidden: EDITOR role required' })
    return
  }
  done()
}
