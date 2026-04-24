import { createFileRoute } from '@tanstack/react-router'
import { getRecipientsFn } from '#/lib/recipients/fn'
import Recipients from '#/components/Recipients'
import { z } from 'zod'

const searchRouteSchema = z.object({
  page: z.number().optional().default(1),
  size: z.number().optional().default(5),
  query: z.string().trim().default(''),
})

export const Route = createFileRoute('/_protected/dashboard/recipients/')({
  validateSearch: (search) => searchRouteSchema.parse(search),
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
