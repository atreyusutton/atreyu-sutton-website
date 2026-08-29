/** Facts go here. Prose is for argument. Digits align. */
export function SpecTable({ specs }: { specs: Record<string, string> }) {
  const rows = Object.entries(specs).filter(([, value]) => value.trim().length > 0)
  if (rows.length === 0) return null

  return (
    <table className="w-full border-collapse border-t border-rule text-left">
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key} className="border-b border-rule align-baseline">
            <th scope="row" className="label w-40 py-2.5 pr-6 font-normal">
              {key}
            </th>
            <td className="num py-2.5 text-sm">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
