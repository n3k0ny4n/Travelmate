import crypto from 'crypto'
import { prisma } from './prisma'

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export async function createSession(userId: string, userAgent?: string): Promise<string> {
  const token = generateToken()
  const tokenHash = hashToken(token)
  const maxAgeDays = parseInt(process.env.SESSION_MAX_AGE_DAYS ?? '180', 10)
  const expiresAt = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent,
    },
  })

  return token
}

export async function getSessionUser(token: string) {
  const tokenHash = hashToken(token)
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  })

  if (!session) return null
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } })
    return null
  }

  return session.user
}
