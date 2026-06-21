import { useState } from 'react'
import { useAppStore } from '../store'
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../api/todos'
import { useMe } from '../api/auth'

export function TodosPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: todos, isLoading } = useTodos(activeTripId)
  const { data: me } = useMe()
  const createTodo = useCreateTodo(activeTripId ?? '')
  const updateTodo = useUpdateTodo(activeTripId ?? '')
  const deleteTodo = useDeleteTodo(activeTripId ?? '')
  const [newText, setNewText] = useState('')

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>

  const isEditor = me?.role === 'EDITOR'
  const done = todos?.filter(t => t.done) ?? []
  const pending = todos?.filter(t => !t.done) ?? []

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>✅ Todo-lista</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.8 }}>{pending.length} kvar av {todos?.length ?? 0}</p>
      </div>

      {isEditor && (
        <form onSubmit={async (e) => {
          e.preventDefault()
          if (!newText.trim()) return
          await createTodo.mutateAsync({ text: newText.trim() })
          setNewText('')
        }} style={{ padding: '16px 16px 0', display: 'flex', gap: 8 }}>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Lägg till uppgift…"
            style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1.5px solid #d1d5db', fontSize: 15 }}
          />
          <button type="submit"
            style={{ padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            +
          </button>
        </form>
      )}

      <div style={{ padding: '16px 16px 0' }}>
        {pending.map(todo => (
          <div key={todo.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: '#fff', borderRadius: 10, marginBottom: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          }}>
            <input type="checkbox" checked={todo.done} disabled={!isEditor}
              onChange={() => isEditor && updateTodo.mutate({ id: todo.id, done: !todo.done })}
              style={{ width: 20, height: 20, cursor: isEditor ? 'pointer' : 'default', accentColor: '#2563eb' }}
            />
            <span style={{ flex: 1, fontSize: 15 }}>{todo.text}</span>
            {isEditor && (
              <button onClick={() => deleteTodo.mutate(todo.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18, padding: 0 }}>
                ✕
              </button>
            )}
          </div>
        ))}

        {done.length > 0 && (
          <>
            <p style={{ color: '#9ca3af', fontSize: 13, margin: '16px 0 8px' }}>Klara ({done.length})</p>
            {done.map(todo => (
              <div key={todo.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                background: '#f9fafb', borderRadius: 10, marginBottom: 6, opacity: 0.7,
              }}>
                <input type="checkbox" checked disabled={!isEditor}
                  onChange={() => isEditor && updateTodo.mutate({ id: todo.id, done: false })}
                  style={{ width: 18, height: 18, accentColor: '#10b981' }}
                />
                <span style={{ flex: 1, fontSize: 14, textDecoration: 'line-through', color: '#6b7280' }}>{todo.text}</span>
                {isEditor && (
                  <button onClick={() => deleteTodo.mutate(todo.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', fontSize: 16, padding: 0 }}>
                    ✕
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
