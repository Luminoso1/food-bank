import {
  createFileRoute,
  redirect,
  useRouter,
  Outlet,
  Link,
} from '@tanstack/react-router'
import { signOut } from '#/lib/auth/authClient'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.removeQueries({ queryKey: ['user'] })
          router.navigate({ to: '/login' })
        },
      },
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <div className="py-4 flex items-center justify-between">
          <menu className="flex items-center gap-8 py-6">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/config">Config</Link>
          </menu>

          <button
            onClick={handleSignOut}
            className="bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all shadow-2xl active:scale-95"
          >
            Sign Out
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
