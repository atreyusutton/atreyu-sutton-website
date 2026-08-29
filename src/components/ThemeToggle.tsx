'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const next = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="label ml-1 border border-rule px-2 py-1 transition-colors hover:border-rule-strong hover:!text-ink"
      aria-label={mounted ? `Switch to ${next} theme` : 'Switch theme'}
    >
      {/* Rendered only after mount so the server and client markup agree. */}
      <span aria-hidden="true">{mounted ? (resolvedTheme === 'dark' ? 'Light' : 'Dark') : '    '}</span>
    </button>
  )
}
