import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema/index.ts'
import 'dotenv/config'
import { env } from '../config/env.ts'

const connectionString =
  env.DATABASE_URL || (process.env.DATABASE_URL as string)
const client = postgres(connectionString)

export const db = drizzle(client, { schema })
