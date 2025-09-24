import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  href?: string
  external?: boolean
  tags?: string[]
  date?: string
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  href, 
  external = false,
  tags = [],
  date
}: ProjectCardProps) {
  const CardContent = () => (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {external && (
          <div className="absolute top-2 right-2 rounded-full bg-black/50 p-1">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {title}
          </h3>
          {date && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {date}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <CardContent />
        </a>
      )
    }
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
