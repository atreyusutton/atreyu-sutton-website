import type {
  ProposalCapability,
  ProposalCapabilityGroup,
  ProposalOrigin,
  ProposalColumn,
  ProposalPipeline,
  ProposalSection,
  ProposalTable,
  ProposalTier,
} from '@/content/types'
import { Section } from './Section'

/* Renders the blocks a proposal needs and a case study does not: a mechanism
   walkthrough, a plan, a set of tiers, and a closing ask. Every block is
   optional, so a section carries only what it actually has. */

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-measure text-lg">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )
}

/** The one place color is allowed to carry weight, so it stays rare. */
function Callout({ text }: { text: string }) {
  return (
    <p className="prose-measure border-l-2 border-accent bg-ground-raised py-4 pl-5 pr-6 text-lg">
      {text}
    </p>
  )
}

function Pipelines({ pipelines }: { pipelines: ProposalPipeline[] }) {
  return (
    <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
      {pipelines.map((pipeline) => (
        <div key={pipeline.label} className="flex flex-col gap-4 bg-ground-raised p-5 md:p-6">
          <p className="label">{pipeline.label}</p>
          <ol className="flex flex-col">
            {pipeline.steps.map((step, i) => (
              <li
                key={i}
                className="num border-b border-dashed border-rule py-2 text-sm leading-relaxed text-ink-muted last:border-b-0"
              >
                {step}
              </li>
            ))}
          </ol>
          {pipeline.note ? (
            <p className="border-t border-rule pt-3 text-sm leading-relaxed text-ink-faint">
              {pipeline.note}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function Table({ table }: { table: ProposalTable }) {
  const emphasize = new Set(table.emphasize ?? [])

  return (
    <div className="overflow-x-auto border border-rule">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="bg-ground-sunken">
            {table.head.map((cell) => (
              <th key={cell} scope="col" className="label px-4 py-2.5 font-normal">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr
              key={r}
              className={`border-t border-rule align-baseline ${
                emphasize.has(r) ? 'bg-ground-raised' : ''
              }`}
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={
                    c === 0
                      ? `num px-4 py-2.5 text-sm whitespace-nowrap ${
                          emphasize.has(r) ? 'text-accent' : 'text-ink-faint'
                        }`
                      : 'px-4 py-2.5 text-sm'
                  }
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

function Columns({ columns }: { columns: ProposalColumn[] }) {
  return (
    <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((column) => (
        <div key={column.label} className="flex flex-col gap-3 bg-ground-raised p-5">
          <p className="label">{column.label}</p>
          <ul className="flex flex-col gap-2">
            {column.items.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Tiers({ tiers }: { tiers: ProposalTier[] }) {
  return (
    <div className="border-t border-rule-strong">
      {tiers.map((tier) => (
        <div
          key={tier.title}
          className="grid gap-2 border-b border-rule py-5 md:grid-cols-[9rem_1fr] md:gap-8"
        >
          <div>
            <p className="num text-sm font-medium">{tier.when}</p>
            <p className="label mt-1">{tier.status}</p>
          </div>
          <div>
            <h3 className="text-xl">{tier.title}</h3>
            <p className="prose-measure mt-2 text-ink-muted">{tier.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Body({ section }: { section: ProposalSection }) {
  return (
    <div className="flex flex-col gap-8">
      {section.body ? <Prose paragraphs={section.body} /> : null}
      {section.callout ? <Callout text={section.callout} /> : null}
      {section.pipelines ? <Pipelines pipelines={section.pipelines} /> : null}
      {section.columns ? <Columns columns={section.columns} /> : null}
      {section.table ? <Table table={section.table} /> : null}
      {section.tiers ? <Tiers tiers={section.tiers} /> : null}
      {section.after ? <Prose paragraphs={section.after} /> : null}
    </div>
  )
}

/* States the rejected idea before arguing against it. Naming what was good
   about it first is what makes the argument credible rather than a straw man. */
export function ProposalOriginBlock({ origin }: { origin: ProposalOrigin }) {
  return (
    <div className="mt-10 border-t border-rule pt-8">
      <p className="label">{origin.label}</p>
      <h2 className="mt-3 text-[clamp(1.5rem,3.4vw,2rem)]">{origin.title}</h2>

      <div className="prose-measure mt-5 text-lg">
        {origin.was.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <p className="prose-measure mt-5 text-lg text-ink-muted">{origin.liked}</p>

      <ol className="mt-7 border-t border-rule-strong">
        {origin.problems.map((problem: ProposalCapability, i) => (
          <li key={problem.lead} className="grid gap-2 border-b border-rule py-4 md:grid-cols-[2.5rem_1fr] md:gap-5">
            <p className="label !text-accent md:pt-1">{String(i + 1).padStart(2, '0')}</p>
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg leading-snug">
                {problem.lead}
              </p>
              <p className="prose-measure mt-1 text-ink-muted">{problem.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="prose-measure mt-7 border-l-2 border-accent bg-ground-raised py-4 pl-5 pr-6 text-lg">
        {origin.verdict}
      </p>
    </div>
  )
}

/* The capability list. Hairline grid rather than a card grid, and the sell is
   carried by how specific each line is rather than by any adjective. */
export function ProposalCapabilities({
  intro,
  groups,
  caveat,
}: {
  intro: string
  groups: ProposalCapabilityGroup[]
  caveat: string
}) {
  return (
    <div className="mt-10">
      <p className="prose-measure text-lg">{intro}</p>

      <div className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-4 bg-ground-raised p-5 md:p-6">
            <p className="label">{group.label}</p>
            <ul className="flex flex-col gap-3.5">
              {group.items.map((item) => (
                <li key={item.lead}>
                  <p className="font-[family-name:var(--font-display)] text-base leading-snug">
                    {item.lead}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="prose-measure mt-6 border-l-2 border-accent bg-ground-raised py-4 pl-5 pr-6">
        {caveat}
      </p>
    </div>
  )
}

/* Numbers are computed by the caller rather than pulled from a callback here.
   A callback would run when this component renders, which is after the parent
   has finished building its own JSX, so the sections would number out of order. */
export function ProposalSections({
  sections,
  numbers,
}: {
  sections: ProposalSection[]
  numbers: string[]
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Section
          key={section.label}
          number={numbers[i]}
          label={section.label}
          title={section.title}
        >
          <Body section={section} />
        </Section>
      ))}
    </>
  )
}

export function ProposalClosing({
  closing,
  number,
}: {
  closing: NonNullable<import('@/content/types').Proposal>['closing']
  number: string
}) {
  return (
    <Section number={number} label={closing.label}>
      <div className="flex flex-col gap-8">
        <p className="prose-measure font-[family-name:var(--font-display)] text-2xl leading-snug">
          {closing.lead}
        </p>

        {closing.body.length > 0 ? <Prose paragraphs={closing.body} /> : null}

        <div className="prose-measure border-l-2 border-accent bg-ground-raised p-5 md:p-6">
          <p className="text-lg">{closing.bar.intro}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {closing.bar.items.map((item, i) => (
              <li key={i} className="text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">{closing.bar.outro}</p>
        </div>
      </div>
    </Section>
  )
}
