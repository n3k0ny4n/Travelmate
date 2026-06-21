import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const accommodationRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/accommodations', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.accommodation.findMany({ where: { tripId: request.params.tripId }, orderBy: { checkInAt: 'asc' } }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/accommodations', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const a = request.body
      const acc = await prisma.accommodation.create({
        data: {
          tripId: request.params.tripId,
          name: a.name,
          address: a.address,
          lat: a.lat,
          lng: a.lng,
          checkInAt: a.checkInAt ? new Date(a.checkInAt) : undefined,
          checkOutAt: a.checkOutAt ? new Date(a.checkOutAt) : undefined,
          bookingRef: a.bookingRef,
          bookingUrl: a.bookingUrl,
          hostName: a.hostName,
          hostEmail: a.hostEmail,
          hostPhone: a.hostPhone,
          rules: a.rules,
          notes: a.notes,
        },
      })
      return reply.code(201).send(acc)
    },
  })

  fastify.get<{ Params: { tripId: string; id: string } }>('/trips/:tripId/accommodations/:id', {
    preHandler: requireAuth,
    handler: async (request, reply) => {
      const acc = await prisma.accommodation.findUnique({ where: { id: request.params.id } })
      if (!acc || acc.tripId !== request.params.tripId) return reply.code(404).send({ error: 'Not found' })
      return acc
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/accommodations/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const a = request.body
      const data: any = {}
      const fields = ['name','address','lat','lng','bookingRef','bookingUrl','hostName','hostEmail','hostPhone','rules','notes']
      for (const f of fields) if (a[f] !== undefined) data[f] = a[f]
      if (a.checkInAt !== undefined) data.checkInAt = a.checkInAt ? new Date(a.checkInAt) : null
      if (a.checkOutAt !== undefined) data.checkOutAt = a.checkOutAt ? new Date(a.checkOutAt) : null
      return prisma.accommodation.update({ where: { id: request.params.id }, data })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/accommodations/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.accommodation.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default accommodationRoutes
