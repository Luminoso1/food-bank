import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getRecipients } from '#/lib/recipients/fn'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const recipients = await getRecipients()
    return { recipients }
  },
  staleTime: 1000 * 60 * 5,
  preloadStaleTime: 1000 * 60 * 5,
})

function RouteComponent() {
  return <Outlet />
}
