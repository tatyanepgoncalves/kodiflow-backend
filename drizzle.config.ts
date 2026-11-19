import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'
import { env } from './src/config/env.ts'

export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './src/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL || (process.env.DATABASE_URL as string),
  },
})
