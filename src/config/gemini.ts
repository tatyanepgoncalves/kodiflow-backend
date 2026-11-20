import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import { env } from './env.ts'

export const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
})
