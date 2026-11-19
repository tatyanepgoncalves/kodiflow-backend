import { pgEnum } from 'drizzle-orm/pg-core'

// Enums para garantir integridade dos dados classificados
export const categoryEnum = pgEnum('message_category', [
  'Dúvida',
  'Reclamação',
  'Solicitação',
])

export const urgencyEnum = pgEnum('message_urgency', ['Baixa', 'Média', 'Alta'])

export const sentimentEnum = pgEnum('message_sentiment', [
  'Positivo',
  'Neutro',
  'Negativo',
])
