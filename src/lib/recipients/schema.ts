import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { recipients } from '#/db/schema'

export const recipientSchema = createInsertSchema(recipients, {
  lastNames: (schema) =>
    schema.min(4, '4 characters min').transform((value) => value.toUpperCase()),

  names: (schema) =>
    schema.min(4, '4 characters min').transform((value) => value.toUpperCase()),

  dni: (schema) =>
    schema
      .min(4, '4 characters min')
      .regex(/^\d+$/, 'Only numbers are allowed')
      .min(6, 'Minimo 6 caracteres'),

  email: (schema) => schema.email('Invalid email').or(z.literal('')).nullable(),

  primaryPhoneNumber: (schema) =>
    schema
      .regex(/^\d+$/, 'Only numbers are allowed')
      .min(10, '10 numbers min')
      .or(z.literal(''))
      .nullable(),

  secondaryPhoneNumber: (schema) =>
    schema
      .regex(/^\d+$/, 'Only numbers are allowed')
      .min(10, '10 numbers min')
      .or(z.literal(''))
      .nullable(),
}).omit({
  createdAt: true,
  updatedAt: true,
})
