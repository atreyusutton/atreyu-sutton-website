import { Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/Button'

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Resume
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Download or view my current resume
          </p>
        </div>

        {/* Download Button */}
        <div className="mt-12 text-center">
          <Button href="/resume.pdf" external size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Resume (PDF)
          </Button>
        </div>

        {/* Resume Preview */}
        <div className="mt-16">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Resume Preview
              </h2>
            </div>
            
            <div className="p-6">
              {/* Resume content would go here - for now showing a placeholder */}
              <div className="aspect-[8.5/11] w-full rounded border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="rounded-full bg-gray-200 p-4 dark:bg-gray-600">
                    <ExternalLink className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Resume Preview
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Click the download button above to view the full PDF resume
                    </p>
                  </div>
                  <Button href="/resume.pdf" external variant="outline">
                    View Full Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5+</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">20+</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">$10M+</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Revenue Generated</div>
          </div>
        </div>
      </div>
    </div>
  )
}
