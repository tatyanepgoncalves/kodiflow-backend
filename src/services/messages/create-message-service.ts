import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import type { CreateMessageInput } from '../../schemas/messages/create-message-schema.ts'
import { classifyMessageByIa } from '../ia/classification-message-by-ia-service.ts'

export const createMessageService = {
  async createAndClassify(input: CreateMessageInput) {
    const classification = await classifyMessageByIa(input.message)

    const [created] = await db
      .insert(schema.messages)
      .values({
        customerName: input.customerName ?? null,
        originalMessage: input.message,
        category: classification.category,
        urgency: classification.urgency,
        sentiment: classification.sentiment,
        department: classification.department,
        summary: classification.summary,
      })
      .returning()

    return created
  },

  listAll() {
    return db
      .select()
      .from(schema.messages)
      .orderBy(desc(schema.messages.createdAt))
  },

  async findById(id: string) {
    const [message] = await db
      .select()
      .from(schema.messages)
      .where(eq(schema.messages.id, id))
    return message ?? null
  },
}
