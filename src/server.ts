import "dotenv/config"
import { app } from "./app.ts"
import  {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import { env } from "./config/env.ts"

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message
    })
  }

  res.status(500).json({ error: "Erro interno do servidor." })
})

app.listen(env.PORT, () => {
  console.log(`O servidor está rodando na URL: http://localhost:${env.PORT}`)
})