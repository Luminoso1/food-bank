import { createFileRoute, redirect, Outlet, Link } from '@tanstack/react-router'
import { Image, Blocks } from 'lucide-react'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full grid md:grid-cols-12 min-h-screen">
      <div className="md:col-span-6 w-full px-6 flex flex-col">
        <header className="py-6">
          <Link
            to="/"
            className="font-semibold flex items-end gap-2 text-black dark:text-white"
          >
            <Blocks />
            Food Bank
          </Link>
        </header>

        <div className="grow flex items-center justify-center">
          <div className="mb-20 max-w-lg mx-auto w-full md:px-6">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="col-span-6 max-md:hidden dark:bg-neutral-800/50 bg-neutral-300 grid place-content-center">
        <div className="p-8 bg-white/50 dark:bg-white/10 inline-block">
          <Image className="brightness-50" size={32} />
        </div>
      </div>
    </div>
  )
}
