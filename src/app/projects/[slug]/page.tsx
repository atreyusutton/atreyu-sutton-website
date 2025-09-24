import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import { Button } from '@/components/Button'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projects
    .filter(project => !project.external)
    .map((project) => ({
      slug: project.id,
    }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.slug)

  if (!project || project.external) {
    notFound()
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <div className="mb-8">
          <Button href="/projects" variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>

        {/* Project header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{project.date}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            {project.fullDescription}
          </p>
        </div>

        {/* Hero image */}
        <div className="mb-12 aspect-video overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Additional images */}
        {project.images && project.images.length > 1 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* External link if available */}
        {project.href && (
          <div className="mt-12 text-center">
            <Button href={project.href} external>
              View Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
