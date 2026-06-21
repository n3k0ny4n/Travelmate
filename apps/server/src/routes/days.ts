import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const dayRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /trips/:tripId/days
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/days', {
    preHandler: requireAuth,
    handler: async (request) => {
      return prisma.day.findMany({
        where: { tripId: request.params.tripId },
        orderBy: { date: 'asc' },
      })
    },
  })

  // POST /trips/:tripId/days
  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/days', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const { date, title, summary, notes } = request.body
      const day = await prisma.day.create({
        data: {
          tripId: request.params.tripId,
          date: new Date(date),
          title,
          summary,
          notes,
        },
      })
      return reply.code(201).send(day)
    },
  })

  // GET /trips/:tripId/days/:dayId
  fastify.get<{ Params: { tripId: string; dayId: string } }>('/trips/:tripId/days/:dayId', {
    preHandler: requireAuth,
    handler: async (request, reply) => {
      const day = await prisma.day.findUnique({
        where: { id: request.params.dayId },
        include: { agendaItems: { orderBy: { order: 'asc' } } },
      })
      if (!day || day.tripId !== request.params.tripId) return reply.code(404).send({ error: 'Not found' })
      return day
    },
  })

  // PATCH /trips/:tripId/days/:dayId
  fastify.patch<{ Params: { tripId: string; dayId: string }; Body: any }>('/trips/:tripId/days/:dayId', {
    preHandler: requireEditor,
    handler: async (request) => {
      const { date, title, summary, notes } = request.body
      return prisma.day.update({
        where: { id: request.params.dayId },
        data: {
          ...(date !== undefined && { date: new Date(date) }),
          ...(title !== undefined && { title }),
          ...(summary !== undefined && { summary }),
          ...(notes !== undefined && { notes }),
        },
      })
    },
  })

  // DELETE /trips/:tripId/days/:dayId
  fastify.delete<{ Params: { tripId: string; dayId: string } }>('/trips/:tripId/days/:dayId', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.day.delete({ where: { id: request.params.dayId } })
      return reply.code(204).send()
    },
  })
}

export default dayRoutes
