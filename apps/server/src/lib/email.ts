import nodemailer from 'nodemailer'

export async function sendMagicLink(email: string, token: string, baseUrl: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const link = `${baseUrl}/auth/verify?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Din inloggningslänk till Reseboken',
    text: `Klicka på länken för att logga in: ${link}\n\nLänken är giltig i 15 minuter.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Logga in på Reseboken</h2>
        <p>Klicka på knappen nedan för att logga in. Länken är giltig i 15 minuter.</p>
        <a href="${link}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Logga in
        </a>
        <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
          Om du inte begärde en inloggningslänk kan du ignorera detta e-postmeddelande.
        </p>
      </div>
    `,
  })
}
