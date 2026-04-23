import { createFileRoute } from '@tanstack/react-router'
import { getRecipientsFn } from '#/lib/recipients/fn'
import Recipients from '#/components/Recipients'

export const Route = createFileRoute('/_protected/dashboard/recipients/')({
  component: RouteComponent,
  loader: async () => {
    const recipients = await getRecipientsFn()
    return { recipients }
  },
  staleTime: 1000 * 60 * 5,
  preloadStaleTime: 1000 * 60 * 5,
})

function RouteComponent() {
  const { recipients } = Route.useLoaderData()
  return <Recipients data={recipients} />
}
