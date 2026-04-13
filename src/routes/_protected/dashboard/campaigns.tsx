import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/campaigns')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/campaigns"!</div>
}
