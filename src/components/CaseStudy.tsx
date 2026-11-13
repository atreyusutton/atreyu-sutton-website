import Image from 'next/image'
import type {
  CaseStudyCard,
  CaseStudyCode,
  CaseStudyVideo,
  ProposalTable,
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

const SHOT_GRID = {
  one: 'max-w-[60rem]',
  two: 'sm:grid-cols-2',
  three: 'sm:grid-cols-2 lg:grid-cols-3',
}

function Shots({ images, layout }: { images: Media[]; layout: 'one' | 'two' | 'three' }) {
  return (
    <div className={`mt-8 grid gap-6 ${SHOT_GRID[layout]}`}>
      {images.map((image) => (
        <figure key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={layout === 'one' ? '(max-width: 1024px) 100vw, 60rem' : '(max-width: 640px) 100vw, 45vw'}
            className="w-full border border-rule"
          />
          {image.caption ? <figcaption className="label mt-2">{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}

function Callout({ text }: { text: string }) {
  return (
    <p className="prose-measure mt-8 border-l-2 border-accent pl-5 font-[family-name:var(--font-display)] text-xl">
      {text}
    </p>
  )
}

function DataTable({ table }: { table: ProposalTable }) {
  const emphasize = new Set(table.emphasize ?? [])

  return (
    /* Focusable so a keyboard user can scroll a wide table sideways. */
    <div tabIndex={0} className="mt-8 max-w-[60rem] overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse border-t border-rule text-left">
        <thead>
          <tr className="border-b border-rule-strong">
            {table.head.map((cell) => (
              <th key={cell} scope="col" className="label py-2.5 pr-6 font-normal">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-b border-rule align-baseline">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`py-2.5 pr-6 text-sm ${c === 0 ? 'num' : 'text-ink-muted'} ${
                    emphasize.has(r) ? '!text-accent' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Clip({ video }: { video: CaseStudyVideo }) {
  return (
    <figure className="mt-8 max-w-[60rem]">
      <video controls preload="none" poster={video.poster} className="w-full border border-rule">
        <source src={video.src} type="video/mp4" />
      </video>
      {video.caption ? <figcaption className="label mt-2">{video.caption}</figcaption> : null}
    </figure>
  )
}

function Cards({ cards }: { cards: CaseStudyCard[] }) {
  return (
    <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title} className="border-t border-rule pt-4">
          {card.image ? (
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={card.image.width}
              height={card.image.height}
              sizes="(max-width: 640px) 100vw, 30vw"
              className="mb-4 aspect-[16/10] w-full border border-rule object-cover object-top"
            />
          ) : null}
          <h3 className="text-[1.15rem]">{card.title}</h3>
          {card.meta ? <p className="label mt-1">{card.meta}</p> : null}
          {card.body ? <p className="mt-2 text-sm text-ink-muted">{card.body}</p> : null}
          {card.links && card.links.length > 0 ? (
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {card.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline num text-sm"
                >
                  {link.label}
                </a>
              ))}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

/** Media that is owed. Shown as an empty marked slot, never filled with a stand-in. */
function Pending({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid max-w-[60rem] gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="border border-dashed border-rule-strong p-4">
          <p className="label">To come</p>
          <p className="mt-2 text-sm text-ink-muted">{item}</p>
        </li>
      ))}
    </ul>
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
      {section.callout ? <Callout text={section.callout} /> : null}
      {section.flow ? <Flow flow={section.flow} /> : null}
      {section.table ? <DataTable table={section.table} /> : null}
      {section.images ? <Shots images={section.images} layout={section.imageLayout ?? 'one'} /> : null}
      {section.video ? <Clip video={section.video} /> : null}
      {section.code ? <Code code={section.code} /> : null}
      {section.facts ? (
        <div className={section.body ? 'mt-8' : ''}>
          <SpecTable specs={section.facts} />
        </div>
      ) : null}
      {section.cards ? <Cards cards={section.cards} /> : null}
      {section.pending ? <Pending items={section.pending} /> : null}
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
