'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Lane, Media, Project, Status, Tier } from '@/content/types'
import { PasscodeGate } from './PasscodeGate'
import { ProjectEditor } from './ProjectEditor'
import { NewProject } from './NewProject'
import { readiness } from './readiness'

const STORAGE_KEY = 'atreyu-studio-v1'

export interface Bundle {
  version: number
  projects: Project[]
  about: {
    bio: string[]
    portrait: Media
    skills: Record<string, string>
  }
}

const TIER_ORDER: Record<Tier, number> = { featured: 0, swap: 1, index: 2, future: 3, writing: 4 }

export function StudioApp() {
  const [unlocked, setUnlocked] = useState(false)
  const [bundle, setBundle] = useState<Bundle | null>(null)
  const [published, setPublished] = useState<Bundle | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [adding, setAdding] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  // The published bundle is always fetched, so "discard local edits" has
  // something to fall back to.
  useEffect(() => {
    if (!unlocked) return
    let cancelled = false

    fetch('/content/bundle.json')
      .then((response) => {
        if (!response.ok) throw new Error(`bundle.json returned ${response.status}`)
        return response.json()
      })
      .then((data: Bundle) => {
        if (cancelled) return
        setPublished(data)

        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            setBundle(mergeWithPublished(JSON.parse(stored) as Bundle, data))
            return
          } catch {
            // A corrupt draft should not lock him out of the editor.
            window.localStorage.removeItem(STORAGE_KEY)
          }
        }
        setBundle(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [unlocked])

  // Autosave. Every keystroke goes to localStorage so a closed tab costs nothing.
  useEffect(() => {
    if (!bundle) return
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle))
      setSavedAt(new Date().toLocaleTimeString())
    }, 400)
    return () => window.clearTimeout(timer)
  }, [bundle])

  const updateProject = useCallback((slug: string, patch: Partial<Project>) => {
    setBundle((current) => {
      if (!current) return current
      return {
        ...current,
        projects: current.projects.map((p) => (p.slug === slug ? { ...p, ...patch } : p)),
      }
    })
  }, [])

  const addProject = useCallback((project: Project) => {
    setBundle((current) => {
      if (!current) return current
      return { ...current, projects: [...current.projects, project] }
    })
    setSelected(project.slug)
    setAdding(false)
  }, [])

  // Only projects that do not exist in the repo yet can be removed here. Anything
  // already published is deleted by removing its file, not by a button in a browser.
  const removeProject = useCallback((slug: string) => {
    setBundle((current) => {
      if (!current) return current
      return { ...current, projects: current.projects.filter((p) => p.slug !== slug) }
    })
    setSelected(null)
  }, [])

  const projects = useMemo(() => {
    if (!bundle) return []
    return [...bundle.projects].sort((a, b) => {
      const tier = TIER_ORDER[a.tier] - TIER_ORDER[b.tier]
      if (tier !== 0) return tier
      if (a.order !== null && b.order !== null && a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title)
    })
  }, [bundle])

  const active = projects.find((p) => p.slug === selected) ?? projects[0] ?? null
  const publishedSlugs = useMemo(
    () => new Set((published?.projects ?? []).map((p) => p.slug)),
    [published],
  )

  const download = () => {
    if (!bundle) return
    const blob = new Blob([JSON.stringify(bundle, null, 2) + '\n'], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'bundle.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const copy = async () => {
    if (!bundle) return
    try {
      await navigator.clipboard.writeText(JSON.stringify(bundle, null, 2))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Clipboard blocked by the browser. Use Download instead.')
    }
  }

  const importFile = (file: File) => {
    file
      .text()
      .then((text) => {
        const parsed = JSON.parse(text) as Bundle
        if (!Array.isArray(parsed.projects)) throw new Error('No projects array in that file')
        setBundle(published ? mergeWithPublished(parsed, published) : parsed)
        setError(null)
      })
      .catch((err: Error) => setError(`Could not read that file: ${err.message}`))
  }

  if (!unlocked) return <PasscodeGate onUnlock={() => setUnlocked(true)} />

  if (error && !bundle) {
    return (
      <p className="mx-auto max-w-2xl px-5 py-20 text-warning">
        Could not load content: {error}
      </p>
    )
  }

  if (!bundle || !active) {
    return <p className="label mx-auto max-w-2xl px-5 py-20">Loading content...</p>
  }

  const ready = projects.filter((p) => readiness(p).publishable).length

  return (
    <div className="mx-auto max-w-[110rem] px-4 py-6 md:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
        <div>
          <h1 className="text-2xl">Studio</h1>
          <p className="label mt-1">
            {projects.length} projects, {ready} ready to publish
            {savedAt ? ` / saved ${savedAt}` : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAdding((open) => !open)}
            aria-expanded={adding}
            className="label border border-rule px-3 py-1.5 hover:!text-ink"
          >
            New project
          </button>
          <button type="button" onClick={download} className="label border border-accent bg-accent px-3 py-1.5 !text-accent-ink">
            Download bundle.json
          </button>
          <button type="button" onClick={copy} className="label border border-rule px-3 py-1.5 hover:!text-ink">
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="label border border-rule px-3 py-1.5 hover:!text-ink"
          >
            Import
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) importFile(file)
              event.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (!published) return
              if (!window.confirm('Discard every local edit and reload the published content?')) return
              window.localStorage.removeItem(STORAGE_KEY)
              setBundle(published)
            }}
            className="label border border-rule px-3 py-1.5 hover:!text-warning"
          >
            Discard local edits
          </button>
        </div>
      </header>

      {error ? <p className="mt-4 text-sm text-warning">{error}</p> : null}

      {adding ? (
        <NewProject
          existing={bundle.projects}
          onCreate={addProject}
          onCancel={() => setAdding(false)}
        />
      ) : null}

      <p className="label mt-4 border border-rule bg-ground-raised px-3 py-2 !normal-case !tracking-normal">
        Edits live in this browser only. To put them on the site: Download bundle.json, then run
        <code className="mx-1 text-ink">npm run content:apply ~/Downloads/bundle.json</code>
        in the repo and commit.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[19rem_1fr]">
        <nav aria-label="Projects" className="lg:sticky lg:top-20 lg:max-h-[80vh] lg:self-start lg:overflow-y-auto">
          <ul className="border-t border-rule">
            {projects.map((project) => {
              const state = readiness(project)
              const isActive = project.slug === active.slug
              return (
                <li key={project.slug} className="border-b border-rule">
                  <button
                    type="button"
                    onClick={() => setSelected(project.slug)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex w-full items-baseline gap-3 px-2 py-2 text-left transition-colors hover:bg-ground-raised ${
                      isActive ? 'bg-ground-raised' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 ${
                        project.published
                          ? 'bg-accent'
                          : state.publishable
                            ? 'border border-accent'
                            : 'border border-rule-strong'
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.95rem]">{project.title}</span>
                      <span className="label block">
                        {publishedSlugs.has(project.slug) ? null : (
                          <span className="!text-accent">new / </span>
                        )}
                        {project.tier}
                        {state.missing.length > 0 ? ` / ${state.missing.length} to do` : ' / ready'}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div>
          <ProjectEditor
            key={active.slug}
            project={active}
            onChange={(patch) => updateProject(active.slug, patch)}
          />

          {publishedSlugs.has(active.slug) ? null : (
            <button
              type="button"
              onClick={() => {
                if (!window.confirm(`Remove ${active.title}? It has never been applied to the repo.`)) return
                removeProject(active.slug)
              }}
              className="label mt-8 border border-rule px-3 py-1.5 hover:!text-warning"
            >
              Remove this draft project
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Keeps a saved draft usable after the content files change: questions, images
 * and hints come from the published bundle, answers and flags from the draft.
 */
function mergeWithPublished(draft: Bundle, publishedBundle: Bundle): Bundle {
  const drafts = new Map(draft.projects?.map((p) => [p.slug, p]) ?? [])

  const projects = publishedBundle.projects.map((live) => {
    const local = drafts.get(live.slug)
    if (!local) return live

    return {
      ...live,
      published: local.published ?? live.published,
      featured: local.featured ?? live.featured,
      order: local.order ?? live.order,
      lane: (local.lane ?? live.lane) as Lane,
      status: (local.status ?? live.status) as Status,
      title: local.title || live.title,
      oneLine: local.oneLine ?? live.oneLine,
      headlineNumber: local.headlineNumber ?? live.headlineNumber,
      specs: local.specs ?? live.specs,
      links: local.links ?? live.links,
      hero: mergeAlt(live.hero, local.hero),
      gallery: live.gallery.map((image) => {
        const localImage = local.gallery?.find((g) => g.src === image.src)
        return mergeAlt(image, localImage ?? null) ?? image
      }),
      intake: live.intake.map((question) => {
        const localAnswer = local.intake?.find((q) => q.question === question.question)
        return { ...question, answer: localAnswer?.answer ?? question.answer }
      }),
    }
  })

  // A project added in the studio but not yet in the repo is kept as is.
  const liveSlugs = new Set(publishedBundle.projects.map((p) => p.slug))
  const extras = (draft.projects ?? []).filter((p) => !liveSlugs.has(p.slug))

  return {
    version: publishedBundle.version,
    projects: [...projects, ...extras],
    about: { ...publishedBundle.about, ...(draft.about ?? {}) },
  }
}

function mergeAlt(live: Media | null, local: Media | null | undefined): Media | null {
  if (!live) return null
  if (!local) return live
  return { ...live, alt: local.alt ?? live.alt, caption: local.caption ?? live.caption }
}
