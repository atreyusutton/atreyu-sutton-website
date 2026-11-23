import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectBySlug, publishedProjects } from '@/content/loader'
import { Deck } from '@/components/Deck'

export function generateStaticParams() {
  return publishedProjects()
    .filter((project) => !project.stub && project.deck)
    .map((project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project?.deck) return {}

  return {
    title: project.deck.title,
    description: project.oneLine,
  }
}

export default async function SlidesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project?.deck) notFound()

  return <Deck deck={project.deck} backHref={`/projects/${project.slug}/`} backLabel={project.title} />
}
