import { z } from 'zod'

export const messageCategorySchema = z.enum([
  'Dúvida',
  'Reclamação',
  'Solicitação',
])

export const messageUrgencySchema = z.enum(['Baixa', 'Média', 'Alta'])

export const messageSentimentSchema = z.enum(['Positivo', 'Neutro', 'Negativo'])

export const createMessageSchema = z.object({
  message: z
    .string({ error: 'A mensagem é obrigatória.' })
    .trim()
    .min(5, 'A mensagem deve ter pelo menos 5 caracteres.')
    .max(3000, 'A mensagem deve ter no máximo 3000 caracteres.'),
  customerName: z.string().trim().min(1).max(120).optional(),
})

export const aiClassificationSchema = z.object({
  category: messageCategorySchema,
  urgency: messageUrgencySchema,
  sentiment: messageSentimentSchema,
  department: z.string().trim().min(2),
  summary: z.string().trim().min(5),
})

export const geminiGenerateContentResponseSchema = z.object({
  candidates: z
    .array(
      z.object({
        content: z
          .object({
            parts: z
              .array(
                z.object({
                  text: z.string().optional(),
                })
              )
              .optional(),
          })
          .optional(),
      })
    )
    .optional(),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>
export type AIClassificationResult = z.infer<typeof aiClassificationSchema>
