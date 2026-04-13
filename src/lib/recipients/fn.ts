import { createServerFn, createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { db } from '#/db'
import { recipients } from '#/db/schema'
import { auth } from '#/lib/auth'
import { recipientSchema } from '#/lib/recipients/schema'

export const ensureAuthFn = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
      throw new Error('Unauthorized')
    }

    return next()
  },
)

export const insertRecipientFn = createServerFn({ method: 'POST' })
  .middleware([ensureAuthFn])
  .inputValidator(recipientSchema)
  .handler(async ({ data }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const result = await db.insert(recipients).values(data).returning()
      return result
    } catch (err: any) {
      if (err.cause.code === '23505') {
        throw new Error('Recipient already exists')
      }
      throw new Error('Internal server error')
    }
  })

export const getRecipientsFn = createServerFn({ method: 'GET' })
  .middleware([ensureAuthFn])
  .handler(async ({}) => {
    const result = await db.select().from(recipients)
    return result
  })
