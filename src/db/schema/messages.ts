import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { categoryEnum, sentimentEnum, urgencyEnum } from './enum.ts'

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Dados de entrada (vindos do n8n)
  customerName: text('customer_name'),
  originalMessage: text('original_message').notNull(),

  // Dados classificados pela IA
  category: categoryEnum('category').notNull(),
  urgency: urgencyEnum('urgency').notNull(),
  sentiment: sentimentEnum('sentiment').notNull(),
  department: text('department').notNull(),
  summary: text('summary').notNull(),

  // Metadados
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
})

// Tipos inferidos automaticamente para usar nos Services/Controllers
export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert
