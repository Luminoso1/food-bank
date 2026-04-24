import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'
import { cn } from '#/lib/utils'

interface Props {
  hasPrevPage: boolean
  hasNextPage: boolean
  rows: number
  page: number
  pages: number
  setPage: (value: number) => void
  setSize: (value: number) => void
  size: number
}

const ROWS_PER_PAGE_VALUES = [5, 10, 20, 30] as const

function Pagination({
  hasPrevPage,
  hasNextPage,
  rows,
  page,
  pages,
  setPage,
  setSize,
  size,
}: Props) {
  return (
    <div className="mt-5 px-2 flex items-center justify-between">
      <span className="text-sm text-neutral-400">{rows} beneficiarios</span>

      <div className="flex items-center gap-12">
        <div className="flex gap-4">
          {ROWS_PER_PAGE_VALUES.map((value) => (
            <button
              key={value}
              onClick={() => setSize(value)}
              className={cn(
                'cursor-pointer size-8 hover:bg-neutral-800 transition-colors py-1 px-2 text-sm',
                size === value && 'font-semibold bg-neutral-700/70',
              )}
            >
              {value}
            </button>
          ))}
        </div>

        <span>
          Pagina {page} de {pages}
        </span>

        <div className="flex gap-4 items-center">
          <button
            disabled={!hasPrevPage}
            onClick={() => setPage(1)}
            className="disabled:opacity-50 border border-neutral-700 size-8 grid place-content-center"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft size={16} />
          </button>
          <button
            disabled={!hasPrevPage}
            onClick={() => setPage(page - 1)}
            className="disabled:opacity-50 border border-neutral-700 size-8 grid place-content-center"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage(page + 1)}
            className="disabled:opacity-50 border border-neutral-700 size-8 grid place-content-center"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight size={16} />
          </button>

          <button
            disabled={!hasNextPage}
            onClick={() => setPage(pages)}
            className="disabled:opacity-50 border border-neutral-700 size-8 grid place-content-center"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
