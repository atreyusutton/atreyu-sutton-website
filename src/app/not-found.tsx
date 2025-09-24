import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Button href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back home
          </Button>
        </div>
      </div>
    </div>
  )
}
