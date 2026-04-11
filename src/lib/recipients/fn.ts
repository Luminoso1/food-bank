import { createServerFn, createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '#/lib/auth'
import { db } from '#/db'
import { recipients } from '#/db/schema'

export const ensureAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
      throw new Error('Unauthorized')
    }

    return next()
  },
)

export const getRecipients = createServerFn({ method: 'GET' })
  .middleware([ensureAuth])
  .handler(async ({}) => {
    const result = await db.select().from(recipients)
    return result
  })
