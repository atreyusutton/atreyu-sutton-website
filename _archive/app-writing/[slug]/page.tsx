import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { allProjects, essays } from '@/content/loader'
import { answerFor, describedImages } from '@/content/types'
import { Section } from '@/components/Section'

// Params come from every essay file, published or not, because a static export
// refuses to build a dynamic route with no params at all. Unpublished essays
// render the 404 page below rather than their draft.
export function generateStaticParams() {
  return allProjects()
    .filter((project) => project.tier === 'writing')
    .map((essay) => ({ slug: essay.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const essay = essays().find((e) => e.slug === slug)
  if (!essay) return {}
  return { title: essay.title, description: essay.oneLine }
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const essay = essays().find((e) => e.slug === slug)
  if (!essay) notFound()

  // An essay is one continuous piece, so the answers run together as prose
  // rather than being broken into labelled case study sections.
  const body = ['constraint', 'decision', 'broke', 'differently']
    .map((role) => answerFor(essay, role as 'constraint'))
    .filter(Boolean)

  const gallery = describedImages(essay.gallery)

  return (
    <article>
      <div className="mx-auto max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">Essay</p>
          <div>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)]">{essay.title}</h1>
            <p className="prose-measure mt-6 text-xl text-ink-muted">{essay.oneLine}</p>
          </div>
        </div>
      </div>

      {body.length > 0 ? (
        <Section number="01" label="Essay">
          <div className="prose-measure text-lg">
            {body.flatMap((block, i) =>
              block.split('\n\n').map((paragraph, j) => <p key={`${i}-${j}`}>{paragraph}</p>),
            )}
          </div>
        </Section>
      ) : null}

      {gallery.length > 0 ? (
        <Section number="02" label="Photographs">
          <div className="grid gap-8 sm:grid-cols-2">
            {gallery.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="w-full object-cover"
                />
                {image.caption ? <figcaption className="label mt-2">{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </Section>
      ) : null}
    </article>
  )
}
