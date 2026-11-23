'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { CaseStudyVideo, Media } from '@/content/types'
import { Lightbox } from './Lightbox'

type Item = { kind: 'photo'; photo: Media; photoIndex: number } | { kind: 'clip'; clip: CaseStudyVideo }

const STEP_BUTTON =
  'label border border-rule-strong bg-ground px-3 py-1.5 hover:border-accent hover:!text-accent'

/**
 * A project's photographs and clips as one viewer: a large frame, a row of
 * thumbnails that swap it, and a full window view when a photo is clicked.
 * A clip plays in the frame. The first photo leads, the clips follow it, then
 * the remaining photos.
 */
export function Gallery({ images, clips = [] }: { images: Media[]; clips?: CaseStudyVideo[] }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState<number | null>(null)

  const photos: Item[] = images.map((photo, photoIndex) => ({ kind: 'photo', photo, photoIndex }))
  const items: Item[] = [
    ...photos.slice(0, 1),
    ...clips.map((clip): Item => ({ kind: 'clip', clip })),
    ...photos.slice(1),
  ]

  if (items.length === 0) return null
  const item = items[active]
  const many = items.length > 1
  const step = (by: number) => setActive((active + by + items.length) % items.length)
  const caption = item.kind === 'photo' ? item.photo.caption : item.clip.caption

  return (
    <figure className="max-w-[60rem]">
      <div className="border border-rule bg-ground-raised">
        {item.kind === 'photo' ? (
          <button
            type="button"
            onClick={() => setZoomed(item.photoIndex)}
            aria-label="View this photo full size"
            className="block w-full cursor-zoom-in"
          >
            <Image
              key={item.photo.src}
              src={item.photo.src}
              alt={item.photo.alt}
              width={item.photo.width}
              height={item.photo.height}
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 60rem"
              className="aspect-[4/3] w-full object-contain"
            />
          </button>
        ) : (
          <video
            key={item.clip.src}
            controls
            playsInline
            preload="metadata"
            poster={item.clip.poster}
            aria-label={item.clip.caption}
            className="aspect-[4/3] w-full bg-ground-sunken object-contain"
          >
            <source src={item.clip.src} type="video/mp4" />
          </video>
        )}
      </div>

      <figcaption className="mt-2 flex items-start justify-between gap-4">
        <span className="label">{caption ?? ''}</span>
        {many ? (
          <span className="flex shrink-0 items-center gap-2">
            <span className="label num mr-1" aria-live="polite">
              {active + 1} / {items.length}
            </span>
            <button type="button" onClick={() => step(-1)} aria-label="Previous" className={STEP_BUTTON}>
              ←
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next" className={STEP_BUTTON}>
              →
            </button>
          </span>
        ) : null}
      </figcaption>

      {many ? (
        <ul aria-label="All photos and clips" className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {items.map((entry, i) => {
            const src =
              entry.kind === 'photo'
                ? (entry.photo.thumb ?? entry.photo.src)
                : (entry.clip.thumb ?? entry.clip.poster)
            return (
              <li key={entry.kind === 'photo' ? entry.photo.src : entry.clip.src} className="w-24 shrink-0 sm:w-28">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={entry.kind === 'photo' ? `Show photo ${i + 1}` : `Show clip ${i + 1}`}
                  aria-current={i === active}
                  className={`relative block w-full border-2 ${i === active ? 'border-accent' : 'border-rule hover:border-rule-strong'}`}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt=""
                      width={480}
                      height={360}
                      sizes="7rem"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <span className="block aspect-[4/3] w-full bg-ground-sunken" />
                  )}
                  {entry.kind === 'clip' ? (
                    <span className="label absolute bottom-0 left-0 bg-ground px-1.5 py-0.5 !text-ink">Clip</span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      <Lightbox
        images={images}
        index={zoomed}
        onIndex={(i) => {
          setZoomed(i)
          setActive(items.findIndex((entry) => entry.kind === 'photo' && entry.photoIndex === i))
        }}
        onClose={() => setZoomed(null)}
      />
    </figure>
  )
}
