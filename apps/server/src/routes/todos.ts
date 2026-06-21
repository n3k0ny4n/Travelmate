import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'

const todoRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/todos', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.todo.findMany({
        where: { tripId: request.params.tripId },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      }),
  })

  fastify.post<{ Params: { tripId: string }; Body: any }>('/trips/:tripId/todos', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const b = request.body
      const todo = await prisma.todo.create({
        data: {
          tripId: request.params.tripId,
          text: b.text,
          dueDate: b.dueDate ? new Date(b.dueDate) : undefined,
          order: b.order ?? 0,
        },
      })
      return reply.code(201).send(todo)
    },
  })

  fastify.patch<{ Params: { tripId: string; id: string }; Body: any }>('/trips/:tripId/todos/:id', {
    preHandler: requireEditor,
    handler: async (request) => {
      const b = request.body
      const data: any = {}
      if (b.text !== undefined) data.text = b.text
      if (b.done !== undefined) data.done = b.done
      if (b.order !== undefined) data.order = b.order
      if (b.dueDate !== undefined) data.dueDate = b.dueDate ? new Date(b.dueDate) : null
      return prisma.todo.update({ where: { id: request.params.id }, data })
    },
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/todos/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      await prisma.todo.delete({ where: { id: request.params.id } })
      return reply.code(204).send()
    },
  })
}

export default todoRoutes
