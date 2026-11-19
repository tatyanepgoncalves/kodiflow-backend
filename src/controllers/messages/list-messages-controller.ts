import type { RequestHandler } from 'express'
import { listMessagesQuerySchema } from '../../schemas/messages/create-message-schema.ts'
import { listMessagesService } from '../../services/messages/list-messages-service.ts'

export const listMessagesController: RequestHandler = async (
  request,
  response
) => {
  const parsedQuery = listMessagesQuerySchema.safeParse(request.query)

  if (!parsedQuery.success) {
    response.status(400).json({ errors: parsedQuery.error.issues })
    return
  }

  const messages = await listMessagesService.listAll(parsedQuery.data.category)
  response.status(200).json(messages)
}
