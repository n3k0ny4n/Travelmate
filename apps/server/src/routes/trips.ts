import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const tripRoutes: FastifyPluginAsync = async (fastify) => {
  // GET / - list trips
  fastify.get('/', {
    preHandler: requireAuth,
    handler: async (request) => {
      const user = request.user!
      if (user.role === 'EDITOR') {
        return prisma.trip.findMany({ orderBy: { startDate: 'asc' } })
      }
      return prisma.trip.findMany({
        where: { createdBy: user.id },
        orderBy: { startDate: 'asc' },
      })
    },
  })

  // POST / - create trip
  fastify.post<{ Body: any }>('/', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const user = request.user!
      const { name, startDate, endDate, description, coverImageId } = request.body
      const trip = await prisma.trip.create({
        data: {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          description,
          coverImageId,
          createdBy: user.id,
        },
      })
      return reply.code(201).send(trip)
    },
  })

  // GET /:id
  fastify.get<{ Params: { id: string } }>('/:id', {
    preHandler: requireAuth,
    handler: async (request, reply) => {
      const trip = await prisma.trip.findUnique({
        where: { id: request.params.id },
        include: {
          days: { orderBy: { date: 'asc' }, include: { agendaItems: { orderBy: { order: 'asc' } } } },
          agendaItems: { orderBy: { order: 'asc' } },
          accommodations: true,
          transportLegs: { include: { tickets: true } },
          tickets: true,
          media: { include: { file: true } },
          reminders: true,
          todos: { orderBy: [{ order: 'asc' }, { done: 'asc' }] },
          files: true,
        },
      })
      if (!trip) return reply.code(404).send({ error: 'Not found' })
      return trip
    },
  })

  // PATCH /:id
  fastify.patch<{ Params: { id: string }; Body: any }>('/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const { name, startDate, endDate, description, coverImageId } = request.body
      const trip = await prisma.trip.update({
        where: { id: request.params.id },
        data: {
          ...(name !== undefined && { name }),
          ...(startDate !== undefined && { startDate: new Date(startDate) }),
          ...(endDate !== undefined && { endDate: new Date(endDate) }),
          ...(description !== undefined && { description }),
          ...(coverImageId !== undefined && { coverImageId }),
        },
      })
      return trip
    },
  })

  // DELETE /:id
  fastify.delete<{ Params: { id: string } }>('/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.trip.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default tripRoutes
