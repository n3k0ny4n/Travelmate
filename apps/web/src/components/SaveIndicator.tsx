import { useAppStore } from '../store'

export function SaveIndicator() {
  const status = useAppStore((s) => s.saveStatus)
  if (status === 'idle') return null
  return (
    <span style={{
      fontSize: 12,
      color: status === 'error' ? '#ef4444' : status === 'saving' ? '#6b7280' : '#10b981',
      padding: '2px 8px',
    }}>
      {status === 'saving' ? 'Sparar…' : status === 'saved' ? '✓ Sparat' : '⚠ Fel vid sparning'}
    </span>
  )
}
