import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db'
import { recipients } from '#/db/schema'
import { recipientSchema } from '#/lib/recipients/schema'
import type { RecipientRow } from './schema'
import { ensureAuthFn } from '#/lib/auth/fn'
import { PROMPT } from '#/lib/helpers/constants'
import { openAiClient } from '#/lib/ai/openai'

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

export const extractImageDataFn = createServerFn({ method: 'POST' })
  .middleware([ensureAuthFn])
  .inputValidator((data: FormData) => {
    const file = data.get('image')
    if (!(file instanceof File)) throw new Error('Invalid file')
    return { file }
  })
  .handler(async ({ data }) => {
    const bytes = await data.file.arrayBuffer()
    const base64Image = Buffer.from(bytes).toString('base64')

    const response = await openAiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PROMPT,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    })

    const result = response.choices[0].message.content

    return JSON.parse(result || '{}') as RecipientRow
  })
