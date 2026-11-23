'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Media } from '@/content/types'
import { Lightbox } from './Lightbox'

const SHOT_GRID = {
  one: 'max-w-[60rem]',
  two: 'sm:grid-cols-2',
  three: 'sm:grid-cols-2 lg:grid-cols-3',
}

/** A section's images in a grid. Each opens full size, and steps to the others. */
export function Shots({ images, layout }: { images: Media[]; layout: 'one' | 'two' | 'three' }) {
  const [zoomed, setZoomed] = useState<number | null>(null)

  return (
    <div className={`mt-8 grid gap-6 ${SHOT_GRID[layout]}`}>
      {images.map((image, i) => (
        <figure key={image.src}>
          <button
            type="button"
            onClick={() => setZoomed(i)}
            aria-label="View this image full size"
            className="block w-full cursor-zoom-in"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={layout === 'one' ? '(max-width: 1024px) 100vw, 60rem' : '(max-width: 640px) 100vw, 45vw'}
              className="w-full border border-rule"
            />
          </button>
          {image.caption ? <figcaption className="label mt-2">{image.caption}</figcaption> : null}
        </figure>
      ))}
      <Lightbox images={images} index={zoomed} onIndex={setZoomed} onClose={() => setZoomed(null)} />
    </div>
  )
}
