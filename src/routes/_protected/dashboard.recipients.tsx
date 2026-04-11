import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/recipients')({
  component: RouteComponent,
})

function RouteComponent() {
  const recipients = useLoaderData({
    from: '/_protected/dashboard',
    select: (route) => route.recipients,
  })
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              #
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              Last Names
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              Names
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              State
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              DNI
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              Email
            </th>
            <th className="py-4 px-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
              Phone
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
          {recipients.map(
            (
              {
                id,
                names,
                lastNames,
                dni,
                email,
                isActive,
                primaryPhoneNumber,
              },
              index,
            ) => (
              <tr
                key={id}
                className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <td className="py-5 px-2 text-xs font-medium text-gray-400">
                  {(index + 1).toString().padStart(2, '0')}
                </td>
                <td className="py-5 px-2 text-xs text-gray-600 dark:text-white/80">
                  {lastNames}
                </td>
                <td className="py-5 px-2 text-xs text-gray-600 dark:text-white/80">
                  {names}
                </td>

                <td className="py-5 px-2 text-xs text-gray-600 dark:text-white/80">
                  <span
                    className={`px-3 py-1 uppercase text-[10px] tracking-[0.2em] font-bold border transition-all
    ${
      isActive
        ? `bg-emerald-50 text-emerald-700 border-emerald-200 
         dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20`
        : `bg-red-50 text-red-700 border-red-200 
         dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20`
    }`}
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td className="py-5 px-2 text-sm font-mono tracking-tighter text-gray-500 dark:text-white/80">
                  {dni}
                </td>
                <td className="py-5 px-2 text-sm font-mono tracking-tighter text-gray-500 dark:text-white/80">
                  {email}
                </td>
                <td className="py-5 px-2 text-sm font-mono tracking-tighter text-gray-500 dark:text-white/80">
                  {primaryPhoneNumber}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
