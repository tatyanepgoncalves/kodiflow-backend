import type { RequestHandler } from 'express'
import { createMessageSchema } from '../../schemas/messages/create-message-schema.ts'
import { createMessageService } from '../../services/messages/create-message-service.ts'

export const createMessagesController: RequestHandler = async (
  request,
  response
) => {
  const parsedBody = createMessageSchema.safeParse(request.body)

  if (!parsedBody.success) {
    response.status(400).json({ errors: parsedBody.error.issues })
    return
  }

  const message = await createMessageService.createAndClassify(parsedBody.data)
  response.status(201).json(message)
}
