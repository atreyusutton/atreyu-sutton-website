'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Media } from '@/content/types'

/**
 * One image at a time, as large as the window allows. Arrow keys step through
 * the set and Escape closes. A native dialog, so focus is trapped and restored
 * by the browser.
 */
export function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: Media[]
  index: number | null
  onIndex: (index: number) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const many = images.length > 1

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  const step = (by: number) => {
    if (index === null) return
    onIndex((index + by + images.length) % images.length)
  }

  const image = index === null ? null : images[index]

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog itself is a click on the backdrop.
        if (event.target === dialog.current) onClose()
      }}
      onKeyDown={(event) => {
        if (!many) return
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      aria-label="Image viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ground p-0 text-ink backdrop:bg-ground"
    >
      {image && index !== null ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
            <p className="label num" aria-live="polite">
              {many ? `${index + 1} / ${images.length}` : 'Image'}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="label border border-rule-strong px-3 py-1.5 hover:border-accent hover:!text-accent"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-3 p-3 sm:p-6">
            {many ? (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="label shrink-0 border border-rule-strong px-3 py-3 hover:border-accent hover:!text-accent"
              >
                ←
              </button>
            ) : null}
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              className="max-h-full min-w-0 max-w-full border border-rule object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
            {many ? (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="label shrink-0 border border-rule-strong px-3 py-3 hover:border-accent hover:!text-accent"
              >
                →
              </button>
            ) : null}
          </div>

          {image.caption ? (
            <p className="label border-t border-rule px-5 py-3 text-center">{image.caption}</p>
          ) : null}
        </div>
      ) : null}
    </dialog>
  )
}
