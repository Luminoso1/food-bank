import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function App() {
  return (
    <main>
      <h1>Hello there!!</h1>
    </main>
  )
}
