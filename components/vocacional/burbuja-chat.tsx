"use client"

import { cn } from "@/lib/utils"
import type { Pregunta } from "@/lib/data/preguntas"
import { IconMap } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BurbujaChatProps {
  tipo: "usuario" | "asistente"
  contenido: string
  pregunta?: Pregunta
  onRespuesta?: (valor: string | number | boolean) => void
  animacion?: boolean
}

export function BurbujaChat({
  tipo,
  contenido,
  pregunta,
  onRespuesta,
  animacion = true
}: BurbujaChatProps) {
  const esUsuario = tipo === "usuario"
  const Icono = pregunta?.icon ? IconMap[pregunta.icon as keyof typeof IconMap] : null

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        esUsuario ? "justify-end" : "justify-start",
        animacion && "animate-in fade-in slide-in-from-bottom-2 duration-300"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-none px-4 py-3 shadow-sm",
          esUsuario
            ? "bg-itc-navy text-white rounded-none"
            : "bg-white border border-gray-100 text-gray-800 rounded-none"
        )}
      >
        {pregunta && !esUsuario && (
          <div className="flex items-center gap-2 mb-2">
            {Icono && <Icono className="w-4 h-4 text-itc-gold" />}
            <span className="text-xs font-medium text-itc-gold uppercase tracking-wider">
              {pregunta.categoria}
            </span>
          </div>
        )}

        {esUsuario ? (
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{contenido}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-headings:text-itc-navy prose-a:text-blue-600 prose-strong:font-semibold prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {contenido}
            </ReactMarkdown>
          </div>
        )}

        {pregunta && onRespuesta && (
          <div className="mt-3 flex flex-wrap gap-2">
            {pregunta.opciones?.map((opcion, i) => (
              <button
                key={i}
                onClick={() => onRespuesta(opcion.valor)}
                className={cn(
                  "px-3 py-2 rounded-none text-sm font-medium transition-all",
                  "bg-itc-navy/5 hover:bg-itc-navy hover:text-white",
                  "border border-itc-navy/20 hover:border-itc-navy",
                  "active:scale-95"
                )}
              >
                {opcion.etiqueta}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
