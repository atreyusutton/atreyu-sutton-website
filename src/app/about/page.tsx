import { SkillBubble } from '@/components/SkillBubble'
import { Timeline } from '@/components/Timeline'

const webSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'UI/UX', 'Figma', 'Adobe CC', 'Photography', 'CAD', '3D Modeling', 'Sustainable Design', 'Project Management'
]

const fabricationSkills = [
  'Welding', 'CNC Machining', '3D Printing', 'Woodworking', 'Metal Fabrication', 'Automotive Repair', 'Electronics Assembly'
]

const designSkills = [
  'Industrial Design', 'Product Design', 'UI/UX Design', 'Brand Identity', 'Photography', 'Technical Drawing', 'Sketching & Rendering'
]

const experienceItems = [
  {
    date: 'Jan 2023 – Present',
    title: 'Founder & Lead Developer',
    institution: 'Sutton Web Solutions',
    location: 'Boulder, CO',
    type: 'experience' as const,
    description: [
      'Developed custom web applications for FuelFed automotive marketplace',
      'Built vacation rental management system for Ute Pass Vacation Rentals',
      'Created real estate collaboration platform for The Real Estate Collaborative',
      'Designed and implemented Nest Messages communication platform'
    ]
  },
  {
    date: 'Jun 2022 – Dec 2022',
    title: 'Video/Photography Technician',
    institution: 'Film Gear South Africa',
    location: 'Cape Town, South Africa',
    type: 'experience' as const,
    description: [
      'Managed technical equipment for film and photography productions',
      'Collaborated with international production teams on commercial projects'
    ]
  },
  {
    date: 'May 2021 – Aug 2021',
    title: 'Sustainable Engineer',
    institution: 'Yestermorrow',
    location: 'Waitsfield, VT',
    type: 'experience' as const,
    description: [
      'Designed and implemented sustainable building solutions',
      'Taught sustainable engineering principles to students'
    ]
  }
]

const educationItems = [
  {
    date: 'Aug 2025 – May 2027',
    title: 'M.S. Engineering – Creative Technology & Design',
    institution: 'University of Colorado Boulder (ATLAS Institute)',
    location: 'Boulder, CO',
    type: 'education' as const
  },
  {
    date: 'Aug 2023 – Present',
    title: 'Student Pilot',
    institution: 'FTP and Journey\'s Aviation',
    location: 'Winter Park, FL, Boulder, CO',
    type: 'education' as const
  },
  {
    date: 'Aug 2020 – May 2023',
    title: 'B.A. Computer Science – 4.0 GPA',
    institution: 'Rollins College',
    location: 'Winter Park, FL',
    type: 'education' as const
  },
  {
    date: 'Aug 2022 – Dec 2022',
    title: 'Object Oriented Programming',
    institution: 'University of Central Florida',
    location: 'Orlando, FL',
    type: 'education' as const
  },
  {
    date: 'May 2022 – Aug 2022',
    title: 'Software Development',
    institution: 'University of Colorado Boulder',
    location: 'Boulder, CO',
    type: 'education' as const
  },
  {
    date: 'May 2021 – Jun 2021',
    title: 'Driving School',
    institution: 'Radford Racing',
    location: '',
    type: 'education' as const
  },
  {
    date: 'Jun 2019 – Aug 2019',
    title: 'Industrial Design Sketching & Rendering',
    institution: 'Rhode Island School of Design',
    location: 'Providence, RI',
    type: 'education' as const
  },
  {
    date: 'Aug 2019 – Dec 2019',
    title: 'Sustainable Engineering & Architecture',
    institution: 'University of Massachusetts Amherst',
    location: 'Amherst, MA',
    type: 'education' as const
  },
  {
    date: 'May 2018 – Aug 2018',
    title: 'Economics',
    institution: 'Brown University',
    location: 'Providence, RI',
    type: 'education' as const
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            About Me
          </h1>
        </div>

        {/* Introduction */}
        <div className="mt-12">
          <div className="prose prose-lg prose-gray mx-auto dark:prose-invert">
            <p>
              I'm a creative technologist who ships. I pair an engineer's systems mindset with a designer's sensitivity to interaction, accessibility, and craft. My background spans product strategy, full‑stack web, and hands‑on prototyping — from image pipelines and dashboards to physical builds and design research.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Skills</h2>
          
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Web/CS/AI</h3>
              <div className="flex flex-wrap gap-3">
                {webSkills.map((skill) => (
                  <SkillBubble key={skill} skill={skill} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Fabrication</h3>
              <div className="flex flex-wrap gap-3">
                {fabricationSkills.map((skill) => (
                  <SkillBubble key={skill} skill={skill} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Design</h3>
              <div className="flex flex-wrap gap-3">
                {designSkills.map((skill) => (
                  <SkillBubble key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Experience</h2>
          <Timeline items={experienceItems} />
        </div>

        {/* Education */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Education</h2>
          <Timeline items={educationItems} />
        </div>
      </div>
    </div>
  )
}
