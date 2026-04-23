import { Link } from '@tanstack/react-router'
import { SmilePlus } from 'lucide-react'
import type { Recipient } from '#/db/schema'
import Table from './Table'
import Badge from './Badge'

interface Props {
  data: Recipient[]
}

function Recipients({ data }: Props) {
  return (
    <>
      <Header />
      <Data data={data} />
    </>
  )
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

const Data = ({ data }: Props) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row className="border-b border-black/10 dark:border-white/10">
          {TABLE_HEADERS.map((value) => (
            <Table.HCell className="text-gray-500 dark:text-gray-400">
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
                {(index + 1).toString().padStart(2, '0')}
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
