import Image from 'next/image'
import Link from 'next/link'
import { essays, featuredProjects, indexProjects } from '@/content/loader'
import { WorkBrowser } from '@/components/WorkBrowser'
import { Section } from '@/components/Section'

export default function HomePage() {
  const featured = featuredProjects()
  const index = indexProjects()
  const writing = essays()

  return (
    <>
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-14 pt-10 md:px-8 md:pb-20 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">01 / Thesis</p>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
            <div>
              <h1>
                I design the part, machine it, and write the firmware that runs it.
              </h1>
              <p className="prose-measure mt-8 text-lg text-ink-muted">
                Atreyu Sutton. Engineering graduate student at the ATLAS Institute in Boulder,
                Colorado, working across mechanical design, software and hardware.
              </p>
            </div>

            <figure className="relative">
              <Image
                src="/home.jpeg"
                alt="Atreyu in a welding helmet and jacket in the shop, smoke still rising from the work in front of him"
                width={1170}
                height={1560}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <WorkBrowser featured={featured} index={index} />

      {writing.length > 0 ? (
        <Section
          number={featured.length > 0 ? '04' : '03'}
          label="Writing"
          title={writing[0].title}
        >
          <p className="prose-measure text-ink-muted">{writing[0].oneLine}</p>
          <p className="mt-6">
            <Link href={`/writing/${writing[0].slug}/`} className="link-underline">
              Read it
            </Link>
          </p>
        </Section>
      ) : null}
    </>
  )
}
