import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '#/env/server.ts'
import { Pool } from 'pg'

import * as schema from './schema.ts'

const connectionString = env.DATABASE_URL

const pool = new Pool({ connectionString })

// --- Pool Logs ---

//
pool.on('connect', () => {
  console.info('[DB] New connection created with PostgreSQL!')
})

pool.on('acquire', () => {
  console.info('[DB] Connection acquired from Pool!')
})

pool.on('error', (err) => {
  console.error('❌ [DB] Error inesperado en el pool', err)
})

export const db = drizzle(pool, { schema })
