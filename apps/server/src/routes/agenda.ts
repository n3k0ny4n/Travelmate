import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const agendaRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /trips/:tripId/agenda
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/agenda', {
    preHandler: requireAuth,
    handler: async (request) => {
      return prisma.agendaItem.findMany({
        where: { tripId: request.params.tripId },
        orderBy: [{ day: { date: 'asc' } }, { order: 'asc' }],
      })
    },
  })

  // POST /trips/:tripId/agenda
  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/agenda', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const { dayId, type, title, startTime, endTime, locationAddress, locationLat, locationLng, description, order } = request.body
      const item = await prisma.agendaItem.create({
        data: {
          tripId: request.params.tripId,
          dayId,
          type,
          title,
          startTime,
          endTime,
          locationAddress,
          locationLat,
          locationLng,
          description,
          order: order ?? 0,
        },
      })
      return reply.code(201).send(item)
    },
  })

  // PATCH /trips/:tripId/agenda/:itemId
  fastify.patch<{ Params: { tripId: string; itemId: string }; Body: any }>('/trips/:tripId/agenda/:itemId', {
    preHandler: requireEditor,
    handler: async (request) => {
      const body = request.body
      const data: any = {}
      if (body.dayId !== undefined) data.dayId = body.dayId
      if (body.type !== undefined) data.type = body.type
      if (body.title !== undefined) data.title = body.title
      if (body.startTime !== undefined) data.startTime = body.startTime
      if (body.endTime !== undefined) data.endTime = body.endTime
      if (body.locationAddress !== undefined) data.locationAddress = body.locationAddress
      if (body.locationLat !== undefined) data.locationLat = body.locationLat
      if (body.locationLng !== undefined) data.locationLng = body.locationLng
      if (body.description !== undefined) data.description = body.description
      if (body.order !== undefined) data.order = body.order
      return prisma.agendaItem.update({ where: { id: request.params.itemId }, data })
    },
  })

  // DELETE /trips/:tripId/agenda/:itemId
  fastify.delete<{ Params: { tripId: string; itemId: string } }>('/trips/:tripId/agenda/:itemId', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.agendaItem.delete({ where: { id: request.params.itemId } })
      return reply.code(204).send()
    },
  })
}

export default agendaRoutes
