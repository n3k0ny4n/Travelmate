import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const ticketRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/tickets', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.ticket.findMany({ where: { tripId: request.params.tripId } }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/tickets', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const b = request.body
      const ticket = await prisma.ticket.create({
        data: {
          tripId: request.params.tripId,
          transportLegId: b.transportLegId,
          linkedType: b.linkedType,
          linkedId: b.linkedId,
          kind: b.kind,
          label: b.label,
          value: b.value,
          fileId: b.fileId,
        },
      })
      return reply.code(201).send(ticket)
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/tickets/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const b = request.body
      const data: any = {}
      for (const f of ['transportLegId','linkedType','linkedId','kind','label','value','fileId'])
        if (b[f] !== undefined) data[f] = b[f]
      return prisma.ticket.update({ where: { id: request.params.id }, data })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/tickets/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.ticket.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default ticketRoutes
