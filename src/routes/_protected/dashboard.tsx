import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="font-semibold text-lg mb-4">hello /dashboard</h1>
    </div>
  )
}
