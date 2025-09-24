import { GraduationCap, Briefcase } from 'lucide-react'

interface TimelineItem {
  date: string
  title: string
  institution: string
  location: string
  type: 'education' | 'experience'
  description?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 h-full w-px bg-gray-300 dark:bg-gray-600"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start space-x-6">
            {/* Timeline icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-8 ring-gray-50 dark:bg-gray-800 dark:ring-gray-900">
              {item.type === 'education' ? (
                <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            
            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.date}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.institution} • {item.location}
              </p>
              {item.description && (
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
