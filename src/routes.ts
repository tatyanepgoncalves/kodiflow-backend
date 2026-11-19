import { Router } from 'express'
import { createMessagesController } from './controllers/messages/create-messages-controller.ts'
import { listMessagesController } from './controllers/messages/list-messages-controller.ts'

export const routes = Router()

routes.get('/messages', listMessagesController)
routes.post('/messages', createMessagesController)
