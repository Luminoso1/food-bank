import {
  createFileRoute,
  redirect,
  useRouter,
  Outlet,
  Link,
} from '@tanstack/react-router'
import { signOut } from '#/lib/auth/authClient'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { UserStar, Wheat, ArrowDownToLine, User, Settings } from 'lucide-react'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <div className="max-w-7xl mx-auto px-4">
      <header>
        <div className="py-4 flex items-center justify-between">
          <menu className="flex items-center gap-4 py-6">
            <Link
              to="/dashboard/recipients"
              className="uppercase font-semibold tracking-widest text-xs transition-colors px-8 py-4 flex items-end gap-2"
              activeProps={{
                className: 'bg-black dark:bg-white dark:text-black text-white',
              }}
            >
              <UserStar size={20} />
              <span>Recipients</span>
            </Link>
            <Link
              to="/dashboard/campaigns"
              className="uppercase font-semibold tracking-widest text-xs transition-colors px-8 py-4 flex items-end gap-2"
              activeProps={{
                className: 'bg-black dark:bg-white dark:text-black text-white',
              }}
            >
              <Wheat size={20} />
              <span>Campaigns</span>
            </Link>
          </menu>

          {/* Avatar */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="dark:bg-white size-13">
              <img
                src="https://api.dicebear.com/9.x/croodles-neutral/svg?eyes=variant09"
                alt="user profile image"
              />
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 top-13 w-60 bg-black dark:bg-white z-50 animate-in fade-in slide-in-from-top-10 duration-300">
                <div className="flex flex-col">
                  <Link
                    to="/"
                    className="flex items-center gap-4 px-6 py-5 text-xs font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black transition-colors hover:underline"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-4 px-6 py-5 text-xs font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black transition-colors hover:underline"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-4 px-6 py-5 text-xs font-bold uppercase tracking-widest text-red-500 bg-black hover:bg-red-500 hover:text-white dark:bg-white dark:hover:bg-red-500 transition-colors border-t border-white/10 dark:border-black/10"
                  >
                    <ArrowDownToLine size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
