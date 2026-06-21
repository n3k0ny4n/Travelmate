import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const reminderRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/reminders', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.reminder.findMany({ where: { tripId: request.params.tripId } }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/reminders', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const b = request.body
      const reminder = await prisma.reminder.create({
        data: {
          tripId: request.params.tripId,
          dayId: b.dayId,
          text: b.text,
          type: b.type,
          triggerHint: b.triggerHint,
        },
      })
      return reply.code(201).send(reminder)
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/reminders/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const b = request.body
      const data: any = {}
      for (const f of ['dayId','text','type','triggerHint']) if (b[f] !== undefined) data[f] = b[f]
      return prisma.reminder.update({ where: { id: request.params.id }, data })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/reminders/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.reminder.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default reminderRoutes
