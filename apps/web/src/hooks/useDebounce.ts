import { useRef, useCallback } from 'react'

export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay = 500) {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay]
  )
}
