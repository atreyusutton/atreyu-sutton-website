import type { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { SpecTable } from '@/components/SpecTable'
import { Timeline } from '@/components/Timeline'
import { education, experience } from '@/content/education'
import { about } from '@/content/about'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Atreyu Sutton, engineering graduate student at the ATLAS Institute in Boulder, Colorado.',
}

export default function AboutPage() {
  const bio = about.bio.filter((paragraph) => paragraph.trim().length > 0)

  return (
    <>
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
        <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">01 / About</p>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-14">
            <div>
              <h1 className="text-[clamp(2.25rem,6vw,3.75rem)]">Atreyu Sutton</h1>
              {bio.length > 0 ? (
                <div className="prose-measure mt-8 text-lg">
                  {bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <figure>
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={about.portrait.width}
                height={about.portrait.height}
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <Section number="02" label="Education" title="Education">
        <Timeline items={education} />
      </Section>

      <Section number="03" label="Experience" title="Experience">
        <Timeline items={experience} />
      </Section>

      <Section number="04" label="Skills">
        <SpecTable specs={about.skills} />
      </Section>

      <Section number="05" label="Contact">
        <p className="prose-measure text-lg">
          Best reached by email at{' '}
          <a href="mailto:me@atreyusutton.com" className="link-underline">
            me@atreyusutton.com
          </a>
          .
        </p>
        <p className="mt-4">
          <a href="/resume.pdf" className="link-underline num text-sm">
            Download resume, PDF
          </a>
        </p>
      </Section>
    </>
  )
}
