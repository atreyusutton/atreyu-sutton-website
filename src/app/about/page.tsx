import type { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { SpecTable } from '@/components/SpecTable'
import { Timeline } from '@/components/Timeline'
import { education } from '@/content/education'
import { about } from '@/content/about'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Atreyu Sutton, engineering graduate student at the ATLAS Institute in Boulder, Colorado, working on AI agents and ML models.',
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

      <Section number="03" label="Work" title="Work">
        {about.work.length > 0 ? (
          <>
            <h3 className="label mb-3 font-normal">Clients and businesses</h3>
            <table className="w-full border-collapse border-t border-rule text-left">
              <tbody>
                {about.work.map((item) => (
                  <tr key={item.name} className="border-b border-rule align-baseline">
                    <th scope="row" className="py-2.5 pr-6 text-[1.05rem] font-normal">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="link-underline"
                          {...(item.href.startsWith('http')
                            ? { target: '_blank', rel: 'noreferrer' }
                            : {})}
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </th>
                    <td className="label py-2.5 text-right">{item.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
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
          , or on{' '}
          <a
            href="https://www.linkedin.com/in/atreyusutton/"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            LinkedIn
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
