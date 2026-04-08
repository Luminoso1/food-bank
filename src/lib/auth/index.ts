import { betterAuth } from 'better-auth'
import { db } from '#/db'
import { env } from '#/env/server'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { user, session, account, verification } from '#/db/schema'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
})
