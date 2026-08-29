import type { Metadata } from 'next'
import Link from 'next/link'
import { essays } from '@/content/loader'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays on building things by hand.',
}

export default function WritingPage() {
  const posts = essays()

  return (
    <section className="mx-auto max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
        <p className="label">01 / Writing</p>
        <div>
          <h1 className="text-[clamp(2.25rem,6vw,3.75rem)]">Writing</h1>

          {posts.length > 0 ? (
            <ul className="mt-10 border-t border-rule">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-rule py-6">
                  <h2 className="text-2xl">
                    <Link href={`/writing/${post.slug}/`} className="link-underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="prose-measure mt-2 text-ink-muted">{post.oneLine}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="prose-measure mt-6 text-lg text-ink-muted">
              Nothing published here yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
