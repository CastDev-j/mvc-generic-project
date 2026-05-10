import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { CARRERAS } from "@/lib/data/carreras"

// System prompt para el asistente vocacional
const SYSTEM_PROMPT = `Eres un orientador vocacional experto del Instituto Tecnológico de Celaya (TecNM). Tu rol es ayudar a estudiantes a elegir la carrera más adecuada para ellos.

INSTRUCCIONES:
- Responde siempre en español, de forma empática, clara y motivadora
- El estudiante te dará su perfil vocacional con las carreras que el sistema le recomendó. DEBES priorizar y responder basándote en esas carreras recomendadas, no en el catálogo completo.
- Cuando el estudiante diga "la primera", "la segunda", "la tercera", "la de en medio", etc., se refiere ESTRICTAMENTE a las carreras recomendadas en su perfil (top 3), NO al catálogo general.
- Incluye datos del mercado laboral mexicano cuando sea relevante
- No inventes datos específicos del instituto; remite al sitio oficial (www.celaya.tecnm.mx) si es necesario
- Sé conciso pero completo en tus respuestas

CATÁLOGO COMPLETO DE CARRERAS DEL ITC CELAYA (${CARRERAS.length} carreras):
${CARRERAS.map(c => `- ${c.nombre} (${c.id})`).join('\n')}

Puedes explicar de cualquier carrera del catálogo:
- Plan de estudios y materias principales
- Campo laboral y oportunidades de empleo
- Salarios promedio en México para egresados
- Perfil del estudiante ideal
- Diferencias entre carreras similares
- Doble titulación y posgrados relacionados`

function convertirMensajes(messages: any[]): { role: "user" | "assistant"; content: string }[] {
  return messages.map(msg => {
    if (msg.role === "assistant" && msg.parts) {
      const texto = msg.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("")
      return { role: "assistant" as const, content: texto }
    }
    return { role: msg.role as "user" | "assistant", content: msg.content ?? "" }
  })
}

export async function POST(req: Request) {
  const { messages, perfilResumen } = await req.json()
  const mensajesCore = convertirMensajes(messages)

  const historialCompleto = perfilResumen
    ? [
        { role: "user" as const, content: perfilResumen },
        { role: "assistant" as const, content: "Perfecto, ya tengo tu perfil vocacional. Puedo explicarte cualquier carrera en detalle, comparar opciones o resolver tus dudas sobre el campo laboral. ¿Qué te gustaría saber?" },
        ...mensajesCore
      ]
    : mensajesCore

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: historialCompleto,
    maxTokens: 1000,
  })

  return result.toUIMessageStreamResponse()
}
