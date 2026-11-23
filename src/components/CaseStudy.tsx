import Image from 'next/image'
import type {
  CaseStudyCard,
  CaseStudyCode,
  CaseStudyCompare,
  CaseStudyDialogue,
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

function Stage({ stage, first }: { stage: FlowStage; first: boolean }) {
  const parallel = stage.boxes.length > 1

  return (
    <li>
      {first ? null : (
        <p className="label py-2 text-center" aria-hidden="true">
          ↓{stage.label ? ` ${stage.label}` : ''}
        </p>
      )}
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
        {flow.stages.map((stage, i) => (
          <Stage
            key={stage.boxes.map((box) => box.title).join()}
            stage={stage}
            first={i === 0 && !flow.offline}
          />
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
  const notes = code.notes ?? []
  const noteAt = new Map(notes.map((note, i) => [note.line, i + 1]))

  return (
    <figure className="mt-8 max-w-[60rem]">
      <figcaption className="label mb-2 [overflow-wrap:anywhere]">{code.file}</figcaption>
      {/* Focusable so a keyboard user can scroll a long line sideways. */}
      <pre
        tabIndex={0}
        className="num overflow-x-auto border border-rule bg-ground-sunken p-4 text-[0.8rem] leading-relaxed"
      >
        {notes.length === 0 ? (
          <code>{code.text}</code>
        ) : (
          <code className="block min-w-fit">
            {code.text.split('\n').map((line, i) => {
              const mark = noteAt.get(i + 1)
              return (
                <span
                  key={i}
                  className={`block border-l-2 pl-3 ${mark ? 'border-accent bg-ground-raised' : 'border-transparent'}`}
                >
                  <span aria-hidden="true" className="inline-block w-6 select-none text-accent">
                    {mark ?? ''}
                  </span>
                  {line}
                  {'\n'}
                </span>
              )
            })}
          </code>
        )}
      </pre>
      {notes.length > 0 ? (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {notes.map((note, i) => (
            <li key={note.line} className="flex gap-3 text-sm text-ink-muted">
              <span className="label !text-accent">{i + 1}</span>
              <span>{note.text}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  )
}

/** Two arrangements of one system, side by side, each ending in its result. */
function Compare({ compare }: { compare: CaseStudyCompare }) {
  return (
    <figure className="mt-8 max-w-[60rem]">
      <figcaption className="sr-only">{compare.summary}</figcaption>
      <div className="grid gap-6 md:grid-cols-2">
        {compare.sides.map((side) => (
          <div key={side.label} className="flex flex-col border border-rule p-4">
            <p className="label">{side.label}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl">{side.title}</p>

            <ol className="mt-4 flex-1">
              {side.machines.map((machine, i) => (
                <li key={machine.name}>
                  {i > 0 ? (
                    <p className="label py-2 text-center" aria-hidden="true">
                      ↑↓{machine.link ? ` ${machine.link}` : ''}
                    </p>
                  ) : null}
                  {machine.link ? <p className="sr-only">Connected by {machine.link}:</p> : null}
                  <div className="border border-rule-strong bg-ground-raised p-4">
                    <p className="font-[family-name:var(--font-display)] text-lg">{machine.name}</p>
                    <ul className="num mt-2 grid gap-1 text-sm text-ink-muted">
                      {machine.jobs.map((job) => (
                        <li key={job}>{job}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-4 border-t border-rule pt-4">
              <span className="num block text-3xl">{side.result.value}</span>
              <span className="label mt-1 block">{side.result.label}</span>
            </p>
          </div>
        ))}
      </div>
    </figure>
  )
}

/** A conversation, with the trace of what produced each answer set under it. */
function Dialogue({ dialogue }: { dialogue: CaseStudyDialogue }) {
  return (
    <figure className="mt-8 max-w-[52rem]">
      <figcaption className="sr-only">{dialogue.summary}</figcaption>
      <ol className="grid gap-4">
        {dialogue.turns.map((turn, i) => (
          <li
            key={i}
            className={
              turn.speaker === 'person'
                ? 'border-l-2 border-accent pl-4 sm:ml-[20%]'
                : 'border border-rule-strong bg-ground-raised p-4 sm:mr-[10%]'
            }
          >
            <p className="label">{turn.name}</p>
            <div className={turn.speaker === 'person' ? 'mt-1 text-lg' : 'mt-2'}>
              {turn.text.map((paragraph, p) => (
                <p key={p} className={p > 0 ? 'mt-3' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            {turn.trace && turn.trace.length > 0 ? (
              <dl className="num mt-4 grid gap-x-4 gap-y-1 border-t border-rule pt-3 text-[0.8rem] sm:grid-cols-[6rem_1fr]">
                {turn.trace.map((step, t) => (
                  <div key={t} className="contents">
                    <dt className="text-accent">{step.label}</dt>
                    <dd className="text-ink-muted [overflow-wrap:anywhere]">{step.detail}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </li>
        ))}
      </ol>
      {dialogue.note ? <p className="label mt-3">{dialogue.note}</p> : null}
    </figure>
  )
}

function Block({ section }: { section: CaseStudySection }) {
  return (
    <>
      {section.body ? <Prose paragraphs={section.body} /> : null}
      {section.callout ? <Callout text={section.callout} /> : null}
      {section.flow ? <Flow flow={section.flow} /> : null}
      {section.compare ? <Compare compare={section.compare} /> : null}
      {section.dialogue ? <Dialogue dialogue={section.dialogue} /> : null}
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
