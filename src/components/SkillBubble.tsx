interface SkillBubbleProps {
  skill: string
}

export function SkillBubble({ skill }: SkillBubbleProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105">
      {skill}
    </span>
  )
}
