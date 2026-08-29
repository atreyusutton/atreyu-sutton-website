'use client'

import Image from 'next/image'
import { LANE_LABELS, STATUS_LABELS, type Lane, type Project, type Status } from '@/content/types'
import { readiness } from './readiness'

const LANES = Object.keys(LANE_LABELS) as Lane[]
const STATUSES = Object.keys(STATUS_LABELS) as Status[]

export function ProjectEditor({
  project,
  onChange,
}: {
  project: Project
  onChange: (patch: Partial<Project>) => void
}) {
  const state = readiness(project)

  const setAnswer = (index: number, answer: string) => {
    onChange({ intake: project.intake.map((q, i) => (i === index ? { ...q, answer } : q)) })
  }

  const setGalleryAlt = (src: string, alt: string) => {
    onChange({ gallery: project.gallery.map((image) => (image.src === src ? { ...image, alt } : image)) })
  }

  return (
    <div className="min-w-0 pb-24">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
        <h2 className="text-2xl">{project.title}</h2>
        <p className="label">{project.slug}</p>
      </div>

      {project.carriedOver ? (
        <p className="mt-4 border border-rule bg-ground-raised px-3 py-2 text-sm text-ink-muted">
          Carried over from the old site. The one line below is the old third person copy. Rewrite it
          in your own voice before this stays up for long.
        </p>
      ) : null}

      {state.missing.length > 0 ? (
        <div className="mt-4 border-l-2 border-warning bg-ground-raised px-3 py-2">
          <p className="label !text-warning">Needed before this can publish</p>
          <ul className="mt-1 text-sm text-ink-muted">
            {state.missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Flags */}
      <Fieldset legend="Placement">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Toggle
            label="Published"
            checked={project.published}
            onChange={(published) => onChange({ published })}
            hint="Off means it does not appear on the site at all."
          />
          <Toggle
            label="Featured"
            checked={project.featured}
            onChange={(featured) => onChange({ featured })}
            hint="One of the eight cards. Needs a number."
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field label="Slot">
            <input
              type="number"
              min={1}
              max={12}
              value={project.order ?? ''}
              onChange={(event) =>
                onChange({ order: event.target.value === '' ? null : Number(event.target.value) })
              }
              className={inputClass}
            />
          </Field>

          <Field label="Lane">
            <select
              value={project.lane}
              onChange={(event) => onChange({ lane: event.target.value as Lane })}
              className={inputClass}
            >
              {LANES.map((lane) => (
                <option key={lane} value={lane}>
                  {LANE_LABELS[lane]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={project.status}
              onChange={(event) => onChange({ status: event.target.value as Status })}
              className={inputClass}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Fieldset>

      {/* The card */}
      <Fieldset legend="The card">
        <Field label="One line" hint="What the card and the index row show. First person, no marketing voice.">
          <textarea
            rows={2}
            value={project.oneLine}
            onChange={(event) => onChange({ oneLine: event.target.value })}
            className={inputClass}
          />
        </Field>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_2fr]">
          <Field label="Number" hint="Measured, never estimated.">
            <input
              value={project.headlineNumber.value}
              onChange={(event) =>
                onChange({ headlineNumber: { ...project.headlineNumber, value: event.target.value } })
              }
              className={inputClass}
            />
          </Field>
          <Field label="Unit" hint="commits, psi, kg, hours.">
            <input
              value={project.headlineNumber.unit}
              onChange={(event) =>
                onChange({ headlineNumber: { ...project.headlineNumber, unit: event.target.value } })
              }
              className={inputClass}
            />
          </Field>
        </div>
      </Fieldset>

      {/* Questions */}
      <Fieldset legend="Questions">
        <ol className="space-y-8">
          {project.intake.map((question, index) => (
            <li key={question.question}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[1.05rem]">
                  <span className="label mr-2">{question.role}</span>
                  {question.question}
                </h3>
                {question.answer.trim() ? <span className="label !text-accent">answered</span> : null}
              </div>

              {question.hint ? (
                <p className="mt-1 text-sm text-ink-faint">{question.hint}</p>
              ) : null}

              {question.draft ? (
                <div className="mt-3 border-l-2 border-rule-strong pl-3">
                  <p className="label">Draft, written from your repo. Check it.</p>
                  <p className="mt-1 text-sm text-ink-muted">{question.draft}</p>
                  <button
                    type="button"
                    onClick={() => setAnswer(index, question.draft)}
                    className="label mt-2 border border-rule px-2 py-1 hover:!text-ink"
                  >
                    Use as my answer
                  </button>
                </div>
              ) : null}

              <textarea
                rows={4}
                value={question.answer}
                placeholder="Your answer"
                onChange={(event) => setAnswer(index, event.target.value)}
                className={`${inputClass} mt-3`}
              />
            </li>
          ))}
        </ol>
      </Fieldset>

      {/* Spec table */}
      <Fieldset legend="Spec table" hint="Role, team size, duration, tools. Facts only.">
        <SpecEditor specs={project.specs} onChange={(specs) => onChange({ specs })} />
      </Fieldset>

      {/* Images */}
      <Fieldset
        legend="Images"
        hint={
          state.hiddenImages > 0
            ? `${state.hiddenImages} image(s) are hidden on the site until they have alt text.`
            : 'Alt text describes the object, not the file.'
        }
      >
        {project.hero ? (
          <ImageRow
            src={project.hero.src}
            alt={project.hero.alt}
            onAlt={(alt) => onChange({ hero: project.hero ? { ...project.hero, alt } : null })}
            badge="Hero"
          />
        ) : (
          <p className="text-sm text-ink-muted">
            No hero image. Add one to public/ and list it in
            <code className="mx-1">src/content/projects/{project.slug}.json</code>.
          </p>
        )}

        {project.gallery.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {project.gallery.map((image) => (
              <li key={image.src}>
                <ImageRow
                  src={image.src}
                  alt={image.alt}
                  onAlt={(alt) => setGalleryAlt(image.src, alt)}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </Fieldset>

      {/* Links */}
      <Fieldset legend="Links">
        <LinkEditor links={project.links} onChange={(links) => onChange({ links })} />
      </Fieldset>
    </div>
  )
}

const inputClass =
  'w-full border border-rule bg-ground-raised px-3 py-2 text-[0.95rem] text-ink placeholder:text-ink-faint'

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="mt-8 border-t border-rule pt-5">
      <legend className="sr-only">{legend}</legend>
      <p className="label">{legend}</p>
      {hint ? <p className="mt-1 text-sm text-ink-faint">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </fieldset>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {hint ? <span className="mt-0.5 block text-sm text-ink-faint">{hint}</span> : null}
      <span className="mt-1.5 block">{children}</span>
    </label>
  )
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  hint?: string
}) {
  return (
    <label className="flex items-start gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--accent)]"
      />
      <span>
        <span className="label !text-ink">{label}</span>
        {hint ? <span className="block text-sm text-ink-faint">{hint}</span> : null}
      </span>
    </label>
  )
}

function ImageRow({
  src,
  alt,
  onAlt,
  badge,
}: {
  src: string
  alt: string
  onAlt: (alt: string) => void
  badge?: string
}) {
  return (
    <div className="grid grid-cols-[4rem_1fr] items-start gap-3">
      <Image
        src={src}
        alt=""
        width={64}
        height={64}
        sizes="64px"
        className="aspect-square w-16 border border-rule object-cover"
      />
      <div>
        <p className="label truncate">
          {badge ? <span className="!text-accent">{badge} </span> : null}
          {src}
        </p>
        <input
          value={alt}
          placeholder="Describe what is in the frame"
          onChange={(event) => onAlt(event.target.value)}
          className={`${inputClass} mt-1`}
        />
      </div>
    </div>
  )
}

function SpecEditor({
  specs,
  onChange,
}: {
  specs: Record<string, string>
  onChange: (specs: Record<string, string>) => void
}) {
  const rows = Object.entries(specs)

  const rename = (oldKey: string, newKey: string) => {
    const next: Record<string, string> = {}
    for (const [key, value] of rows) next[key === oldKey ? newKey : key] = value
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {rows.map(([key, value]) => (
        <div key={key} className="grid grid-cols-[10rem_1fr_2rem] gap-2">
          <input value={key} onChange={(event) => rename(key, event.target.value)} className={inputClass} />
          <input
            value={value}
            onChange={(event) => onChange({ ...specs, [key]: event.target.value })}
            className={inputClass}
          />
          <button
            type="button"
            aria-label={`Remove ${key}`}
            onClick={() => {
              const next = { ...specs }
              delete next[key]
              onChange(next)
            }}
            className="label border border-rule hover:!text-warning"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange({ ...specs, [`Field ${rows.length + 1}`]: '' })}
        className="label border border-rule px-2 py-1 hover:!text-ink"
      >
        Add row
      </button>
    </div>
  )
}

function LinkEditor({
  links,
  onChange,
}: {
  links: { label: string; href: string }[]
  onChange: (links: { label: string; href: string }[]) => void
}) {
  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <div key={index} className="grid grid-cols-[10rem_1fr_2rem] gap-2">
          <input
            value={link.label}
            placeholder="Label"
            onChange={(event) =>
              onChange(links.map((l, i) => (i === index ? { ...l, label: event.target.value } : l)))
            }
            className={inputClass}
          />
          <input
            value={link.href}
            placeholder="https://"
            onChange={(event) =>
              onChange(links.map((l, i) => (i === index ? { ...l, href: event.target.value } : l)))
            }
            className={inputClass}
          />
          <button
            type="button"
            aria-label={`Remove link ${link.label}`}
            onClick={() => onChange(links.filter((_, i) => i !== index))}
            className="label border border-rule hover:!text-warning"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...links, { label: '', href: '' }])}
        className="label border border-rule px-2 py-1 hover:!text-ink"
      >
        Add link
      </button>
    </div>
  )
}
