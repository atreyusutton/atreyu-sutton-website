'use client'

import { useEffect, useState } from 'react'

const SESSION_KEY = 'atreyu-studio-unlocked'

// Set NEXT_PUBLIC_STUDIO_PASSCODE at build time to change it. This gate keeps
// the page out of casual sight. It is not security: the bundle it edits is a
// public file on a static site, and anyone who wants the passcode can read the
// JavaScript. Never put anything in here you would not publish.
const PASSCODE = process.env.NEXT_PUBLIC_STUDIO_PASSCODE ?? 'layout-blue'

export function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === 'yes') onUnlock()
  }, [onUnlock])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (value === PASSCODE) {
          window.sessionStorage.setItem(SESSION_KEY, 'yes')
          onUnlock()
        } else {
          setWrong(true)
        }
      }}
      className="mx-auto max-w-sm px-5 py-24"
    >
      <h1 className="text-2xl">Studio</h1>
      <label htmlFor="passcode" className="label mt-6 block">
        Passcode
      </label>
      <input
        id="passcode"
        type="password"
        value={value}
        autoComplete="current-password"
        onChange={(event) => {
          setValue(event.target.value)
          setWrong(false)
        }}
        className="num mt-2 w-full border border-rule bg-ground-raised px-3 py-2 text-ink"
      />
      {wrong ? <p className="mt-2 text-sm text-warning">Not that one.</p> : null}
      <button
        type="submit"
        className="label mt-4 border border-accent bg-accent px-4 py-2 !text-accent-ink"
      >
        Open
      </button>
    </form>
  )
}
