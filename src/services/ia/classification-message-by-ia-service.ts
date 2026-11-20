import { env } from '../../config/env.ts'
import { gemini } from '../../config/gemini.ts'
import {
  type AIClassificationResult,
  aiClassificationSchema,
} from '../../schemas/messages/create-message-schema.ts'

export async function classifyMessageByIa(
  message: string
): Promise<AIClassificationResult> {
  const prompt = `
      Você é um assistente de triagem de atendimento ao cliente.
      Analise a mensagem e classifique-a estritamente seguindo as regras abaixo.

      Categorias permitidas:
      - "Dúvida": perguntas sobre produtos, funcionamento, prazos ou informações gerais.
      - "Reclamação": insatisfação, atrasos, falhas, erros ou problemas com atendimento/entrega.
      - "Solicitação": pedidos de alteração, cancelamento, reembolso, segunda via ou ações específicas.

      Urgência:
      - "Baixa", "Média" ou "Alta"

      Sentimento:
      - "Positivo", "Neutro" ou "Negativo"

      Responda APENAS com um JSON válido, sem markdown ou texto extra, no formato:
      {
        "category": "Dúvida" | "Reclamação" | "Solicitação",
        "urgency": "Baixa" | "Média" | "Alta",
        "sentiment": "Positivo" | "Neutro" | "Negativo",
        "department": "nome do setor sugerido",
        "summary": "resumo objetivo em uma frase"
      }

      Mensagem do cliente:
      """${message}"""
    `.trim()

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada no ambiente.')
  }

  const response = await gemini.models.generateContent({
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.1,
      abortSignal: AbortSignal.timeout(20_000),
    },
    model: env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  })

  const rawText = response.text
  if (!rawText) {
    throw new Error('Resposta vazia do modelo de IA.')
  }

  const parsedJson: unknown = JSON.parse(rawText)
  return aiClassificationSchema.parse(parsedJson)
}
