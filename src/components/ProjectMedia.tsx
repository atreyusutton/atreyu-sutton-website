import Image from 'next/image'
import type { CaseStudyVideo, Media } from '@/content/types'

/**
 * Every photo and clip a project has, as one strip of small frames directly
 * under the hero. A photo opens at full size. A clip plays in place.
 */
export function ProjectMedia({ images, clips }: { images: Media[]; clips: CaseStudyVideo[] }) {
  if (images.length === 0 && clips.length === 0) return null

  return (
    <ul
      aria-label="Photos and clips"
      className="mx-auto mt-6 grid max-w-[var(--page-max)] grid-cols-2 gap-x-3 gap-y-5 px-5 sm:grid-cols-3 md:px-8 lg:grid-cols-5"
    >
      {clips.map((clip) => (
        <li key={clip.src}>
          <figure>
            <video
              controls
              preload="none"
              poster={clip.poster}
              aria-label={clip.caption}
              className="aspect-[4/3] w-full border border-rule bg-ground-sunken object-cover"
            >
              <source src={clip.src} type="video/mp4" />
            </video>
            {clip.caption ? <figcaption className="label mt-2">{clip.caption}</figcaption> : null}
          </figure>
        </li>
      ))}

      {images.map((image) => (
        <li key={image.src}>
          <figure>
            <a href={image.src} target="_blank" rel="noreferrer" className="block">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="aspect-[4/3] w-full border border-rule object-cover"
              />
            </a>
            {image.caption ? <figcaption className="label mt-2">{image.caption}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  )
}
