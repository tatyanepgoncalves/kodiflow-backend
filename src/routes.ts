import { Router } from 'express'
import { createMessagesController } from './controllers/messages/create-messages-controller.ts'

export const routes = Router()

routes.post('/messages', createMessagesController)
