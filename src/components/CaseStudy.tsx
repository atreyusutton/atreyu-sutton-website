import Image from 'next/image'
import type {
  CaseStudyCode,
  CaseStudyFlow,
  CaseStudySection,
  FlowStage,
  Media,
} from '@/content/types'
import { Section } from './Section'
import { SpecTable } from './SpecTable'

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-measure text-lg">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )
}

function Stage({ stage }: { stage: FlowStage }) {
  const parallel = stage.boxes.length > 1

  return (
    <li>
      <p className="label py-2 text-center" aria-hidden="true">
        ↓{stage.label ? ` ${stage.label}` : ''}
      </p>
      {stage.label ? <p className="sr-only">Then, {stage.label}:</p> : null}

      <div className={`grid gap-3 ${stage.aside ? 'sm:grid-cols-[1fr_15rem]' : ''}`}>
        <div className={`grid gap-3 ${parallel ? 'sm:grid-cols-3' : ''}`}>
          {stage.boxes.map((box) => (
            <div key={box.title} className="border border-rule-strong bg-ground-raised p-4">
              <p className="flex items-baseline gap-3">
                {box.step ? <span className="label !text-accent">{box.step}</span> : null}
                <span className="font-[family-name:var(--font-display)] text-lg">{box.title}</span>
              </p>
              {box.note ? <p className="mt-1 text-sm text-ink-muted">{box.note}</p> : null}
            </div>
          ))}
        </div>

        {stage.aside ? (
          <p className="self-center border border-dashed border-rule-strong p-3 text-sm text-ink-muted">
            {stage.aside}
          </p>
        ) : null}
      </div>
    </li>
  )
}

/** The pipeline drawn as stacked stages. Parallel work sits side by side. */
function Flow({ flow }: { flow: CaseStudyFlow }) {
  return (
    <figure className="mt-8 max-w-[52rem]">
      <figcaption className="sr-only">{flow.summary}</figcaption>

      {flow.offline ? (
        <div className="border border-rule bg-ground-sunken p-4">
          <p className="label">{flow.offline.label}</p>
          <ul className="mt-3 grid gap-2">
            {flow.offline.lines.map((line) => (
              <li key={line.join()} className="num flex flex-wrap items-baseline gap-x-2 text-sm">
                {line.map((step, i) => (
                  <span key={step} className="flex items-baseline gap-x-2">
                    {i > 0 ? (
                      <span className="text-ink-faint" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                    {step}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ol>
        {flow.stages.map((stage) => (
          <Stage key={stage.boxes.map((box) => box.title).join()} stage={stage} />
        ))}
      </ol>
    </figure>
  )
}

function Shots({ images, layout }: { images: Media[]; layout: 'one' | 'two' }) {
  return (
    <div className={`mt-8 grid gap-6 ${layout === 'two' ? 'sm:grid-cols-2' : 'max-w-[60rem]'}`}>
      {images.map((image) => (
        <figure key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={layout === 'two' ? '(max-width: 640px) 100vw, 45vw' : '(max-width: 1024px) 100vw, 60rem'}
            className="w-full border border-rule"
          />
          {image.caption ? <figcaption className="label mt-2">{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}

function Code({ code }: { code: CaseStudyCode }) {
  return (
    <figure className="mt-8 max-w-[60rem]">
      <figcaption className="label mb-2">{code.file}</figcaption>
      {/* Focusable so a keyboard user can scroll a long line sideways. */}
      <pre
        tabIndex={0}
        className="num overflow-x-auto border border-rule bg-ground-sunken p-4 text-[0.8rem] leading-relaxed"
      >
        <code>{code.text}</code>
      </pre>
    </figure>
  )
}

function Block({ section }: { section: CaseStudySection }) {
  return (
    <>
      {section.body ? <Prose paragraphs={section.body} /> : null}
      {section.flow ? <Flow flow={section.flow} /> : null}
      {section.images ? <Shots images={section.images} layout={section.imageLayout ?? 'one'} /> : null}
      {section.code ? <Code code={section.code} /> : null}
      {section.facts ? (
        <div className={section.body ? 'mt-8' : ''}>
          <SpecTable specs={section.facts} />
        </div>
      ) : null}
      {section.after ? (
        <div className="mt-8">
          <Prose paragraphs={section.after} />
        </div>
      ) : null}
    </>
  )
}

export function CaseStudySections({
  sections,
  numbers,
}: {
  sections: CaseStudySection[]
  numbers: string[]
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={section.label} number={numbers[i]} label={section.label} title={section.title}>
          <Block section={section} />
        </Section>
      ))}
    </>
  )
}
