import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const transportRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/transport', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.transportLeg.findMany({
        where: { tripId: request.params.tripId },
        include: { tickets: true },
        orderBy: { departAt: 'asc' },
      }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/transport', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const b = request.body
      const leg = await prisma.transportLeg.create({
        data: {
          tripId: request.params.tripId,
          mode: b.mode,
          from: b.from,
          to: b.to,
          departAt: b.departAt ? new Date(b.departAt) : undefined,
          arriveAt: b.arriveAt ? new Date(b.arriveAt) : undefined,
          bookingRef: b.bookingRef,
          notes: b.notes,
        },
      })
      return reply.code(201).send(leg)
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/transport/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const b = request.body
      const data: any = {}
      for (const f of ['mode','from','to','bookingRef','notes']) if (b[f] !== undefined) data[f] = b[f]
      if (b.departAt !== undefined) data.departAt = b.departAt ? new Date(b.departAt) : null
      if (b.arriveAt !== undefined) data.arriveAt = b.arriveAt ? new Date(b.arriveAt) : null
      return prisma.transportLeg.update({ where: { id: request.params.id }, data })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/transport/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.transportLeg.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default transportRoutes
