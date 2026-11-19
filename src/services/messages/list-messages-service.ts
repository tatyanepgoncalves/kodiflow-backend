import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import type { ListMessagesQuery } from '../../schemas/messages/create-message-schema.ts'

type MessageCategory = ListMessagesQuery['category']

export const listMessagesService = {
  listAll(category?: MessageCategory) {
    return db
      .select()
      .from(schema.messages)
      .where(category ? eq(schema.messages.category, category) : undefined)
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
