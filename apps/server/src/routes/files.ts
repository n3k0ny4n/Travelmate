import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma'
import { requireAuth, requireEditor } from '../plugins/auth'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'

const ALLOWED_MIME = [
  'image/jpeg','image/png','image/gif','image/webp',
  'application/pdf',
]

const fileRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Params: { tripId: string } }>('/trips/:tripId/files', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const data = await request.file()
      if (!data) return reply.code(400).send({ error: 'No file' })
      if (!ALLOWED_MIME.includes(data.mimetype)) {
        return reply.code(400).send({ error: 'Invalid file type' })
      }

      const storagePath = process.env.STORAGE_PATH ?? path.join(process.cwd(), 'data/uploads')
      await fs.mkdir(storagePath, { recursive: true })

      const ext = path.extname(data.filename) || ''
      const storageKey = `${crypto.randomBytes(16).toString('hex')}${ext}`
      const filePath = path.join(storagePath, storageKey)

      const chunks: Buffer[] = []
      for await (const chunk of data.file) chunks.push(chunk)
      const buffer = Buffer.concat(chunks)

      if (buffer.length > 20 * 1024 * 1024) {
        return reply.code(400).send({ error: 'File too large' })
      }

      await fs.writeFile(filePath, buffer)

      const file = await prisma.file.create({
        data: {
          tripId: request.params.tripId,
          mimeType: data.mimetype,
          size: buffer.length,
          storageKey,
          originalName: data.filename,
        },
      })
      return reply.code(201).send(file)
    },
  })

  fastify.get<{ Params: { tripId: string } }>('/trips/:tripId/files', {
    preHandler: requireAuth,
    handler: async (request) =>
      prisma.file.findMany({ where: { tripId: request.params.tripId } }),
  })

  fastify.delete<{ Params: { tripId: string; id: string } }>('/trips/:tripId/files/:id', {
    preHandler: requireEditor,
    handler: async (request, reply) => {
      const file = await prisma.file.findUnique({ where: { id: request.params.id } })
      if (file) {
        const storagePath = process.env.STORAGE_PATH ?? path.join(process.cwd(), 'data/uploads')
        await fs.unlink(path.join(storagePath, file.storageKey)).catch(() => {})
        await prisma.file.delete({ where: { id: file.id } })
      }
      return reply.code(204).send()
    },
  })
}

export default fileRoutes
