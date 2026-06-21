import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const mediaRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/media', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.media.findMany({
        where: { tripId: request.params.tripId },
        include: { file: true },
        orderBy: { createdAt: 'desc' },
      }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/media', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const b = request.body
      const media = await prisma.media.create({
        data: {
          tripId: request.params.tripId,
          fileId: b.fileId,
          caption: b.caption,
          linkedType: b.linkedType,
          linkedId: b.linkedId,
        },
        include: { file: true },
      })
      return reply.code(201).send(media)
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/media/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const b = request.body
      const data: any = {}
      for (const f of ['caption','linkedType','linkedId']) if (b[f] !== undefined) data[f] = b[f]
      return prisma.media.update({ where: { id: request.params.id }, data, include: { file: true } })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/media/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.media.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default mediaRoutes
