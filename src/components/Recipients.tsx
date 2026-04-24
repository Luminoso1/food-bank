import { useSearch, useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { SmilePlus } from 'lucide-react'
import type { Recipient } from '#/db/schema'
import Table from './Table'
import Badge from './Badge'
import Pagination from './Pagination'

interface Props {
  data: Recipient[]
}

function Recipients({ data }: Props) {
  const { data: recipients, startIndex, ...rest } = usePagination(data)
  return (
    <>
      <Header />
      <Data data={recipients} startIndex={startIndex} />
      <Pagination {...rest} />
    </>
  )
}

const usePagination = (data: Array<any>) => {
  const { page, size } = useSearch({
    from: '/_protected/dashboard/recipients/',
  })

  const navigate = useNavigate({ from: '/dashboard/recipients/' })

  const totalPages = Math.ceil(data.length / size)
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  const setPage = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: Math.min(Math.max(1, page), totalPages),
      }),
    })
  }
  const setSize = (size: number) => {
    navigate({
      search: (prev) => ({ ...prev, size, page: 1 }),
    })
  }

  return {
    data: data.slice((page - 1) * size, page * size),
    startIndex: (page - 1) * size,
    hasPrevPage,
    hasNextPage,
    page,
    pages: totalPages,
    rows: data.length,
    size,
    setPage,
    setSize,
  }
}

const Header = () => {
  return (
    <div className="flex items-center justify-between my-3">
      {/* Search Bar */}
      <input
        type="search"
        placeholder="Find Recipients..."
        className="max-w-sm w-full border border-white/10 transition-all outline-2 outline-transparent focus:outline-neutral-800 focus:shadow shadow-neutral-800 p-8 py-3 placeholder:text-sm"
      />

      {/* Add new recipient*/}
      <Link
        to="/dashboard/recipients/new"
        className="flex items-end gap-2 text-white bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-2xl active:scale-95"
      >
        <SmilePlus size={18} />
        <span>New</span>
      </Link>
    </div>
  )
}

const TABLE_HEADERS = [
  '#',
  'Last Names',
  'Names',
  'State',
  'DNI',
  'Email',
  'Phone',
] as const

const Data = ({ data, startIndex }: Props & { startIndex: number }) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row className="border-b border-black/10 dark:border-white/10">
          {TABLE_HEADERS.map((value) => (
            <Table.HCell
              key={value}
              className="text-gray-500 dark:text-gray-400"
            >
              {value}
            </Table.HCell>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map(
          (
            { id, names, lastNames, dni, email, isActive, primaryPhoneNumber },
            index,
          ) => (
            <Table.Row
              key={id}
              className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              <Table.Cell className="text-gray-400">
                {(startIndex + (index + 1)).toString().padStart(2, '0')}
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80">
                {lastNames}
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80">
                {names}
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80">
                <Badge status={isActive ? 'active' : 'inactive'} />
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80 font-mono tracking-tighter text-sm!">
                {dni}
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80 font-mono tracking-tighter text-sm!">
                {email}
              </Table.Cell>

              <Table.Cell className="text-gray-600 dark:text-white/80 font-mono tracking-tighter text-sm!">
                {primaryPhoneNumber}
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table.Body>
    </Table>
  )
}

export default Recipients
