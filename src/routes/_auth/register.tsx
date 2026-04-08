import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { signUp } from '#/lib/auth/authClient'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Password is not the same')
      setLoading(false)
      return
    }

    const result = await signUp.email({ name, email, password })

    if (result.error) {
      setError(result.error.message || 'Invalid email or password')
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }
  return (
    <div className="max-w-md mx-auto px-6 py-10 bg-white dark:bg-black transition-colors">
      <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        Create Account
      </h2>

      <form className="space-y-8" onSubmit={onSubmit}>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-2xl active:scale-95"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{' '}
          <Route.Link
            href="/login"
            className="text-black dark:text-white font-medium hover:opacity-70 transition"
          >
            Sign in
          </Route.Link>
        </p>
      </form>
    </div>
  )
}
