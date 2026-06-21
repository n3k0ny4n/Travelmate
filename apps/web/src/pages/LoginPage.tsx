import { useState } from 'react'
import { useRequestMagicLink } from '../api/auth'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [sent, setSent] = useState(false)
  const requestLink = useRequestMagicLink()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await requestLink.mutateAsync(username)
    setSent(true)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
      padding: 16,
    }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 400, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✈️</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#1e3a5f' }}>Reseboken</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0', fontSize: 14 }}>Din digitala resebok</p>
        </div>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
            <p style={{ color: '#1e3a5f', fontWeight: 600 }}>Kolla din e-post!</p>
            <p style={{ color: '#6b7280', fontSize: 14 }}>
              Om kontot finns har en inloggningslänk skickats. Länken är giltig i 15 minuter.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ marginTop: 16, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
              Försök igen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              Användarnamn
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ditt_användarnamn"
              required
              autoFocus
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 8,
                border: '1.5px solid #d1d5db', fontSize: 16, boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={requestLink.isPending}
              style={{
                marginTop: 16, width: '100%', padding: '14px',
                background: '#2563eb', color: '#fff', border: 'none',
                borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer',
                opacity: requestLink.isPending ? 0.7 : 1,
              }}>
              {requestLink.isPending ? 'Skickar…' : 'Skicka inloggningslänk'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
