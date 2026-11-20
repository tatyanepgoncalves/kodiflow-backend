import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  GEMINI_API_KEY: z.string(),
  GEMINI_MODEL: z.string().default('gemini-3.5-flash-lite'),
})

export const env = envSchema.parse(process.env)
