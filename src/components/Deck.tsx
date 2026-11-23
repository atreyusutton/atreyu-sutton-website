'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Deck as DeckContent, DeckSlide } from '@/content/types'

const BAR_BUTTON =
  'label border border-rule-strong px-3 py-1.5 hover:border-accent hover:!text-accent aria-pressed:border-accent aria-pressed:!text-accent'

function SlideText({ slide, first }: { slide: DeckSlide; first: boolean }) {
  return (
    <div className="min-w-0">
      {slide.kicker ? <p className="label">{slide.kicker}</p> : null}
      <h1
        className={`mt-3 text-balance ${first ? 'text-[clamp(3rem,9vw,7rem)]' : 'text-[clamp(1.75rem,4vw,3.25rem)]'}`}
      >
        {slide.title}
      </h1>

      {slide.body ? (
        <div className="mt-5 max-w-[48rem] text-[clamp(1.05rem,1.7vw,1.5rem)] text-ink-muted">
          {slide.body.map((paragraph, i) => (
            <p key={i} className={i > 0 ? 'mt-3' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {slide.bullets ? (
        <ul className="mt-6 max-w-[52rem] text-[clamp(1rem,1.5vw,1.35rem)]">
          {slide.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-4 border-t border-rule py-3">
              <span className="label num mt-1.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {slide.columns ? (
        <div
          className={`mt-7 grid gap-x-8 gap-y-6 ${slide.columns.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}
        >
          {slide.columns.map((column) => (
            <section key={column.title} className="border-t-2 border-ink pt-3">
              <h2 className="text-[clamp(1.1rem,1.6vw,1.5rem)]">{column.title}</h2>
              {column.meta ? <p className="label mt-1">{column.meta}</p> : null}
              <ul className="mt-3 text-[clamp(0.95rem,1.25vw,1.15rem)]">
                {column.items.map((entry, i) => (
                  <li key={i} className="border-t border-rule py-2">
                    {entry}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}

      {slide.stats ? (
        <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-rule pt-5">
          {slide.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="label mt-1 max-w-[18rem]">{stat.label}</dt>
              <dd className="num text-[clamp(2rem,4.5vw,4rem)] leading-none">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  )
}

function SlideMedia({ slide }: { slide: DeckSlide }) {
  if (slide.video) {
    return (
      <figure className="flex min-h-0 min-w-0 flex-col">
        <video
          controls
          playsInline
          preload="metadata"
          poster={slide.video.poster}
          aria-label={slide.video.caption}
          className="max-h-[54vh] w-full border border-rule bg-ground-sunken object-contain"
        >
          <source src={slide.video.src} type="video/mp4" />
        </video>
        {slide.video.caption ? <figcaption className="label mt-2">{slide.video.caption}</figcaption> : null}
      </figure>
    )
  }
  if (slide.image) {
    return (
      <Image
        src={slide.image.src}
        alt={slide.image.alt}
        width={slide.image.width}
        height={slide.image.height}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        className="max-h-[70vh] w-full min-w-0 border border-rule object-contain"
      />
    )
  }
  return null
}

/**
 * A project's slides, one at a time, filling the window. Arrow keys, Space and
 * Page keys step through. N shows the speaker notes and F goes full screen.
 * The slide number lives in the URL hash, so a slide can be linked to.
 */
export function Deck({ deck, backHref, backLabel }: { deck: DeckContent; backHref: string; backLabel: string }) {
  const [index, setIndex] = useState(0)
  const [notes, setNotes] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const total = deck.slides.length

  const go = useCallback(
    (to: number) => {
      const clamped = Math.max(0, Math.min(total - 1, to))
      setIndex(clamped)
      window.history.replaceState(null, '', `#${clamped + 1}`)
    },
    [total],
  )

  const toggleFullscreen = useCallback(() => {
    const el = frame.current
    if (!el) return
    const request = document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen()
    request.catch((error: unknown) => {
      console.error('Full screen was refused by the browser', error)
    })
  }, [])

  useEffect(() => {
    const fromHash = Number.parseInt(window.location.hash.slice(1), 10)
    if (Number.isFinite(fromHash)) setIndex(Math.max(0, Math.min(total - 1, fromHash - 1)))
  }, [total])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      const onControl = target ? ['VIDEO', 'BUTTON', 'A'].includes(target.tagName) : false
      if (event.key === ' ' && onControl) return

      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        go(index + 1)
      } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        go(index - 1)
      } else if (event.key === 'Home') go(0)
      else if (event.key === 'End') go(total - 1)
      else if (event.key === 'n' || event.key === 'N') setNotes((shown) => !shown)
      else if (event.key === 'f' || event.key === 'F') toggleFullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, total, toggleFullscreen])

  const slide = deck.slides[index]
  const hasMedia = Boolean(slide.image || slide.video)
  const textOnly = !hasMedia
  const mediaOnly = hasMedia && !slide.body && !slide.bullets && !slide.columns && !slide.stats

  return (
    <div ref={frame} className="fixed inset-0 z-50 flex flex-col bg-ground text-ink">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-rule px-5 py-3 md:px-8">
        <Link href={backHref} className="label hover:!text-accent">
          ← {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setNotes(!notes)} aria-pressed={notes} className={BAR_BUTTON}>
            Notes
          </button>
          <button type="button" onClick={toggleFullscreen} className={`${BAR_BUTTON} hidden sm:block`}>
            Full screen
          </button>
        </div>
      </header>

      <main
        id="main"
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto px-5 py-8 md:px-12 md:py-10 lg:px-20"
      >
        <article
          key={index}
          aria-label={`Slide ${index + 1} of ${total}`}
          className={`mx-auto grid min-h-full w-full max-w-[100rem] content-center items-center gap-8 lg:gap-14 ${
            textOnly ? '' : mediaOnly ? '' : 'lg:grid-cols-2'
          }`}
        >
          <SlideText slide={slide} first={index === 0} />
          {hasMedia ? <SlideMedia slide={slide} /> : null}
        </article>
      </main>

      {notes ? (
        <aside
          aria-label="Speaker notes"
          className="max-h-[32vh] overflow-y-auto border-t border-rule-strong bg-ground-raised px-5 py-4 md:px-8"
        >
          <p className="label">
            Speaker notes{slide.time ? <span className="num">, about {slide.time}</span> : null}
          </p>
          {slide.notes && slide.notes.length > 0 ? (
            <ul className="mt-2 max-w-[60rem] text-base">
              {slide.notes.map((note, i) => (
                <li key={i} className="py-1">
                  {note}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-base text-ink-muted">No notes for this slide.</p>
          )}
        </aside>
      ) : null}

      <footer className="flex items-center justify-between gap-4 border-t border-rule px-5 py-3 md:px-8">
        <p className="label num">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <div
          role="progressbar"
          aria-label="Progress through the slides"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          className="hidden h-px flex-1 bg-rule sm:block"
        >
          <div className="h-[3px] -translate-y-px bg-accent" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className={`${BAR_BUTTON} disabled:opacity-40`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next slide"
            className={`${BAR_BUTTON} disabled:opacity-40`}
          >
            →
          </button>
        </div>
      </footer>
    </div>
  )
}
