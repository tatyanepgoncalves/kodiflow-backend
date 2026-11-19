import {
  type AIClassificationResult,
  aiClassificationSchema,
  geminiGenerateContentResponseSchema,
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

  // Chamada à API de IA configurada via ambiente (ex.: GEMINI_API_KEY)
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada no ambiente.')
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro na API de IA (${response.status}): ${errorText}`)
  }

  const data = geminiGenerateContentResponseSchema.parse(await response.json())
  const rawText = data.candidates?.[0]?.content?.parts?.find(
    (part) => part.text
  )?.text

  if (!rawText) {
    throw new Error('Resposta vazia do modelo de IA.')
  }

  const parsedJson: unknown = JSON.parse(rawText)
  return aiClassificationSchema.parse(parsedJson)
}
