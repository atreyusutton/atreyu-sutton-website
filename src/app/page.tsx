import Image from 'next/image'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import { ArrowRight, Download, Mail } from 'lucide-react'

const featuredProjects = [
  {
    title: 'Fuelfed Motor Market',
    description: 'An online marketplace for vintage 4x4s and enthusiast vehicles.',
    image: '/fuelfed-motor-market/fuelfed-1-hero.png',
    href: 'https://rileyshucks.com',
    external: true,
    tags: ['Web', 'Work'],
    date: 'Jan 2025'
  },
  {
    title: 'Nest Messages',
    description: 'A platform sending uplifting daily messages to support youth mental health.',
    image: '/nest-messages/nest-messages-1-hero.png',
    href: 'https://nest-messages.pages.dev/',
    external: true,
    tags: ['Web', 'Social Impact'],
    date: 'Mar 2024'
  },
  {
    title: 'Toyota 4Runner Build',
    description: 'Restoring and upgrading a classic \'85 Toyota 4Runner.',
    image: '/1985-toyota-4runner/hero.png',
    href: '/projects/toyota-4runner-build',
    tags: ['Fabrication'],
    date: 'May 2024'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                Engineering the{' '}
                <span className="text-indigo-600 dark:text-indigo-400">
                  creative edge
                </span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                M.S. in Engineering – Creative Technology & Design (CU Boulder, ATLAS). 
                I pair systems thinking with hands‑on prototyping to ship fast, accessible products.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/projects" size="lg">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact
                </Button>
                <Button href="/resume.pdf" variant="outline" size="lg" external>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-20 blur-3xl"></div>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                  <Image
                    src="/home.jpeg"
                    alt="Atreyu Sutton"
                    width={500}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-800/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              A selection of recent work spanning web development, fabrication, and creative technology
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/projects" size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}