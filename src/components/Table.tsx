import { cn } from '#/lib/utils'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
interface SectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
interface CellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export default function Table({ children, className, ...rest }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        {...rest}
        className={cn('w-full text-left border-collapse', className)}
      >
        {children}
      </table>
    </div>
  )
}

Table.Head = ({ children, className, ...rest }: SectionProps) => {
  return (
    <thead {...rest} className={cn('', className)}>
      {children}
    </thead>
  )
}

Table.Body = ({ children, className, ...rest }: SectionProps) => {
  return (
    <tbody
      {...rest}
      className={cn('divide-y divide-gray-100 dark:divide-white/5', className)}
    >
      {children}
    </tbody>
  )
}

Table.Row = ({ children, className, ...rest }: RowProps) => {
  return (
    <tr {...rest} className={cn('', className)}>
      {children}
    </tr>
  )
}

Table.HCell = ({ children, className, ...rest }: CellProps) => {
  return (
    <td
      {...rest}
      className={cn('py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold', className)}
    >
      {children}
    </td>
  )
}

Table.Cell = ({ children, className, ...rest }: CellProps) => {
  return (
    <td {...rest} className={cn('py-5 px-2 text-xs', className)}>
      {children}
    </td>
  )
}
