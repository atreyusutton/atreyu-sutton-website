import type { Metadata } from 'next'
import { StudioApp } from '@/components/studio/StudioApp'

// Not linked from anywhere, disallowed in robots.txt, and told not to index.
// It is hidden, not private: see the note in PasscodeGate.
export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false, nocache: true },
}

export default function StudioPage() {
  return <StudioApp />
}
