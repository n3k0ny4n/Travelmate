import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function AuthVerifyPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = params.get('token')
    if (!token) { setError('Ingen token hittades.'); return }
    fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`, { credentials: 'include', redirect: 'manual' })
      .then((res) => {
        if (res.ok || res.status === 302 || res.type === 'opaqueredirect') {
          navigate('/', { replace: true })
        } else {
          return res.json().then((d) => setError(d.error ?? 'Länken är ogiltig eller har utgått.'))
        }
      })
      .catch(() => setError('Nätverksfel – försök igen.'))
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ textAlign: 'center' }}>
        {error ? (
          <>
            <div style={{ fontSize: 40 }}>❌</div>
            <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
            <a href="/login" style={{ color: '#2563eb' }}>Tillbaka till inloggning</a>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40 }}>⏳</div>
            <p style={{ color: '#6b7280' }}>Loggar in…</p>
          </>
        )}
      </div>
    </div>
  )
}
