import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/config')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/config"!</div>
}
