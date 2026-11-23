'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Media } from '@/content/types'
import { Lightbox } from './Lightbox'

/**
 * A project's photographs as one viewer: a large frame, a row of thumbnails
 * that swap it, and a full window view on click.
 */
export function Gallery({ images }: { images: Media[] }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState<number | null>(null)

  if (images.length === 0) return null
  const image = images[active]
  const many = images.length > 1
  const step = (by: number) => setActive((active + by + images.length) % images.length)

  return (
    <figure className="max-w-[60rem]">
      <div className="relative border border-rule bg-ground-raised">
        <button
          type="button"
          onClick={() => setZoomed(active)}
          aria-label="View this photo full size"
          className="block w-full cursor-zoom-in"
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 60rem"
            className="aspect-[4/3] w-full object-contain"
          />
        </button>

        {many ? (
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="label border border-rule-strong bg-ground px-3 py-2 hover:border-accent hover:!text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="label border border-rule-strong bg-ground px-3 py-2 hover:border-accent hover:!text-accent"
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      <figcaption className="mt-2 flex items-baseline justify-between gap-4">
        <span className="label">{image.caption ?? ''}</span>
        {many ? (
          <span className="label num shrink-0" aria-live="polite">
            {active + 1} / {images.length}
          </span>
        ) : null}
      </figcaption>

      {many ? (
        <ul aria-label="All photos" className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((thumb, i) => (
            <li key={thumb.src} className="w-24 shrink-0 sm:w-28">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={`block w-full border-2 ${i === active ? 'border-accent' : 'border-rule hover:border-rule-strong'}`}
              >
                <Image
                  src={thumb.thumb ?? thumb.src}
                  alt=""
                  width={480}
                  height={360}
                  sizes="7rem"
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <Lightbox
        images={images}
        index={zoomed}
        onIndex={(i) => {
          setZoomed(i)
          setActive(i)
        }}
        onClose={() => setZoomed(null)}
      />
    </figure>
  )
}
