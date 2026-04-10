import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { signIn } from '#/lib/auth/authClient'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = await signIn.email({ email, password })

    if (result.error) {
      setError(result.error.message || 'Invalid email or password')
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div>
      <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        Login
      </h2>

      <form className="space-y-8" onSubmit={onSubmit}>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="text-white w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-2xl active:scale-95"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{' '}
          <Route.Link
            to="/register"
            className="text-black dark:text-white font-medium hover:opacity-70 transition"
          >
            Sign up
          </Route.Link>
        </p>
      </form>
    </div>
  )
}
