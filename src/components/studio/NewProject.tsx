'use client'

import { useState } from 'react'
import type { IntakeQuestion, Lane, Project, Tier } from '@/content/types'
import { LANE_LABELS } from '@/content/types'
import { inputClass } from './ProjectEditor'

const LANES: Lane[] = ['mechanical', 'software', 'hardware', 'fab']
const TIERS: Tier[] = ['index', 'swap', 'featured']

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueSlug(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}

/**
 * A new project always gets the longest question set in the bundle, which is the
 * featured one. Toggling Featured on later then costs nothing: the constraint and
 * decision questions are already sitting there waiting for an answer.
 */
function blankIntake(projects: Project[]): IntakeQuestion[] {
  const template = projects.reduce<Project | null>(
    (best, p) => (!best || p.intake.length > best.intake.length ? p : best),
    null,
  )
  return (template?.intake ?? []).map((q) => ({
    role: q.role,
    question: q.question,
    hint: q.hint,
    draft: '',
    answer: '',
  }))
}

/** The browser knows the real dimensions, so they can never drift from the file. */
function measure(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => reject(new Error(`No image at ${src}`))
    img.src = src
  })
}

export function NewProject({
  existing,
  onCreate,
  onCancel,
}: {
  existing: Project[]
  onCreate: (project: Project) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [lane, setLane] = useState<Lane>('mechanical')
  const [tier, setTier] = useState<Tier>('index')
  const [heroSrc, setHeroSrc] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const slug = uniqueSlug(slugify(title), new Set(existing.map((p) => p.slug)))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('A title is required.')
      return
    }

    setBusy(true)
    setError(null)

    let hero = null
    if (heroSrc.trim()) {
      const src = heroSrc.trim().startsWith('/') ? heroSrc.trim() : `/${heroSrc.trim()}`
      try {
        const { width, height } = await measure(src)
        hero = { src, alt: '', width, height }
      } catch (err) {
        setError(
          `${(err as Error).message}. Drop the file in public/ first, or leave this blank and add it later.`,
        )
        setBusy(false)
        return
      }
    }

    onCreate({
      slug,
      title: title.trim(),
      lane,
      tier,
      order: null,
      published: false,
      featured: tier === 'featured',
      status: 'in-progress',
      oneLine: '',
      headlineNumber: { value: '', unit: '' },
      specs: {},
      hero,
      gallery: [],
      video: null,
      links: [],
      intake: blankIntake(existing),
    })
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="mt-4 border border-accent bg-ground-raised p-4">
      <h2 className="label !text-ink">New project</h2>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="label !text-ink">Title</span>
          <input
            value={title}
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Digital Record Player"
            className={`${inputClass} mt-1`}
          />
          {slug ? <span className="label mt-1 block">/projects/{slug}/</span> : null}
        </label>

        <label className="block">
          <span className="label !text-ink">Hero image, optional</span>
          <input
            value={heroSrc}
            onChange={(event) => setHeroSrc(event.target.value)}
            placeholder="/record-player/hero.jpg"
            className={`${inputClass} mt-1`}
          />
          <span className="label mt-1 block">
            A path under public/. Dimensions are measured for you.
          </span>
        </label>

        <label className="block">
          <span className="label !text-ink">Lane</span>
          <select
            value={lane}
            onChange={(event) => setLane(event.target.value as Lane)}
            className={`${inputClass} mt-1`}
          >
            {LANES.map((id) => (
              <option key={id} value={id}>
                {LANE_LABELS[id]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label !text-ink">Tier</span>
          <select
            value={tier}
            onChange={(event) => setTier(event.target.value as Tier)}
            className={`${inputClass} mt-1`}
          >
            {TIERS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="mt-3 text-sm text-warning">{error}</p> : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={busy}
          className="label border border-accent bg-accent px-3 py-1.5 !text-accent-ink disabled:opacity-60"
        >
          {busy ? 'Creating...' : 'Create project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="label border border-rule px-3 py-1.5 hover:!text-ink"
        >
          Cancel
        </button>
        <span className="label">
          It stays unpublished until it has a one line and a described image.
        </span>
      </div>
    </form>
  )
}
