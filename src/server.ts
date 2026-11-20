import 'dotenv/config'
import type { NextFunction, Request, Response } from 'express'
import { app } from './app.ts'
import { env } from './config/env.ts'

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  res.status(500).json({ error: 'Erro interno do servidor.' })
})

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`O servidor está rodando na URL: http://localhost:${env.PORT}`)
})
