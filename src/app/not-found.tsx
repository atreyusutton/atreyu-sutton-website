import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[var(--page-max)] px-5 py-24 md:px-8">
      <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
        <p className="label !text-warning">404</p>
        <div>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)]">No page here</h1>
          <p className="prose-measure mt-6 text-lg text-ink-muted">
            The link is wrong or the page has moved.
          </p>
          <p className="mt-8">
            <Link href="/" className="link-underline">
              Back to the start
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
