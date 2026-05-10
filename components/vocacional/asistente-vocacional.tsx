"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { cn } from "@/lib/utils"
import { PREGUNTAS, type Pregunta } from "@/lib/data/preguntas"
import { PERFIL_INICIAL, type PerfilEstudiante } from "@/lib/data/variables"
import { recomendar, generarResumenPerfil, type ResultadoCarrera } from "@/lib/engine"
import { HeaderITC } from "./header-itc"
import { BarraProgreso } from "./barra-progreso"
import { BurbujaChat } from "./burbuja-chat"
import { TarjetaResultados } from "./tarjeta-resultados"
import { IoSend } from "react-icons/io5"
import { FaGraduationCap, FaClock } from "react-icons/fa"

type Fase = "bienvenida" | "preguntas" | "resultado" | "libre"

interface MensajeLocal {
  id: string
  tipo: "usuario" | "asistente"
  contenido: string
  pregunta?: Pregunta
}

export function AsistenteVocacional() {
  const [fase, setFase] = useState<Fase>("bienvenida")
  const [perfil, setPerfil] = useState<PerfilEstudiante>(PERFIL_INICIAL)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [mensajes, setMensajes] = useState<MensajeLocal[]>([])
  const [resultados, setResultados] = useState<ResultadoCarrera[]>([])
  const [perfilResumen, setPerfilResumen] = useState<string>("")
  const [inputLocal, setInputLocal] = useState("")

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const procesandoRef = useRef(false)

  const {
    messages: mensajesIA,
    sendMessage,
    status
  } = useChat({
    api: "/api/chat"
  })

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [mensajes, mensajesIA, scrollToBottom])

  const progreso = (preguntaActual / PREGUNTAS.length) * 100

  const agregarMensaje = useCallback((tipo: "usuario" | "asistente", contenido: string, pregunta?: Pregunta) => {
    const nuevoMensaje: MensajeLocal = {
      id: Date.now().toString(),
      tipo,
      contenido,
      pregunta
    }
    setMensajes(prev => [...prev, nuevoMensaje])
  }, [])

  const iniciarCuestionario = useCallback(() => {
    setFase("preguntas")
    setPreguntaActual(0)
    setMensajes([])

    const primeraPregunta = PREGUNTAS[0]
    agregarMensaje("asistente", primeraPregunta.texto, primeraPregunta)
  }, [agregarMensaje])

  const procesarRespuesta = useCallback((valor: string | number | boolean) => {
    if (procesandoRef.current) return
    procesandoRef.current = true

    const pregunta = PREGUNTAS[preguntaActual]
    const etiqueta = pregunta.opciones?.find(o => o.valor === valor)?.etiqueta || String(valor)
    agregarMensaje("usuario", etiqueta)
    setPerfil(prev => ({...prev, [pregunta.variable]: valor}))

    if (preguntaActual < PREGUNTAS.length - 1) {
      const sigIdx = preguntaActual + 1
      setPreguntaActual(sigIdx)
      setTimeout(() => {
        agregarMensaje("asistente", PREGUNTAS[sigIdx].texto, PREGUNTAS[sigIdx])
        procesandoRef.current = false
      }, 400)
    } else {
      const perfilFinal = {...perfil, [pregunta.variable]: valor}
      const carrerasRecomendadas = recomendar(perfilFinal)
      setResultados(carrerasRecomendadas)
      const resumen = generarResumenPerfil(perfilFinal, carrerasRecomendadas)
      setPerfilResumen(resumen)
      agregarMensaje("asistente", "Perfecto, ya tengo toda la informacion que necesito. Aqui estan tus carreras recomendadas:")
      setPreguntaActual(PREGUNTAS.length)
      setFase("resultado")
      setTimeout(() => {
        agregarMensaje("asistente", "Ahora puedes preguntarme cualquier cosa sobre estas carreras o el ITC Celaya. Que te gustaria saber?")
        setFase("libre")
        procesandoRef.current = false
      }, 2000)
    }
  }, [preguntaActual, perfil, agregarMensaje])

  const handleEnviarMensaje = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const textoTrimmed = inputLocal.trim()
    if (!textoTrimmed) return

    if (fase === "libre") {
      sendMessage(
        { role: "user", content: textoTrimmed },
        { body: { perfilResumen } }
      )
      setInputLocal("")
    }
  }, [fase, inputLocal, perfilResumen, sendMessage])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderITC estadoConexion={status === "streaming" || status === "submitted" ? "cargando" : "conectado"} />

      {fase === "preguntas" && (
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <BarraProgreso progreso={progreso} />
          </div>
        </div>
      )}

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-2xl mx-auto space-y-2">
          {fase === "bienvenida" && (
            <div className="text-center py-8 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-itc-navy rounded-[20px] mx-auto mb-6 flex items-center justify-center">
                <FaGraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-itc-navy mb-3">
                Bienvenido al Asistente Vocacional
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Te ayudare a descubrir que carrera del Instituto Tecnologico de Celaya
                es la mas adecuada para ti mediante un breve cuestionario.
              </p>
              <button
                onClick={iniciarCuestionario}
                className={cn(
                  "bg-itc-navy text-white px-8 py-3 rounded-none font-medium",
                  "hover:bg-itc-navy/90 transition-all",
                  "shadow-lg hover:shadow-xl active:scale-95"
                )}
              >
                Comenzar Cuestionario
              </button>
              <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <FaClock className="w-3 h-3" />
                Tiempo estimado: 3-5 minutos
              </p>
            </div>
          )}

          {fase === "preguntas" && (
            <>
              {mensajes.map((mensaje, i) => {
                const actual = mensaje.pregunta && i === preguntaActual * 2
                return (
                  <BurbujaChat
                    key={mensaje.id}
                    tipo={mensaje.tipo}
                    contenido={mensaje.contenido}
                    pregunta={actual ? mensaje.pregunta : undefined}
                    onRespuesta={actual ? procesarRespuesta : undefined}
                  />
                )
              })}
            </>
          )}

          {(fase === "resultado" || fase === "libre") && (
            <>
              {mensajes.filter(m => m.tipo === "asistente" && !m.pregunta).slice(-1).map(mensaje => (
                <BurbujaChat
                  key={mensaje.id}
                  tipo="asistente"
                  contenido={mensaje.contenido}
                />
              ))}
              {resultados.length > 0 && (
                <TarjetaResultados resultados={resultados} className="my-4" />
              )}
            </>
          )}

          {fase === "libre" && mensajesIA.map((mensaje) => {
            const texto = mensaje.parts?.filter((p: any) => p.type === "text").map((p: any) => p.text).join("") || mensaje.content || ""
            return (
              <BurbujaChat
                key={mensaje.id}
                tipo={mensaje.role === "user" ? "usuario" : "asistente"}
                contenido={texto}
              />
            )
          })}

          {(status === "submitted" || status === "streaming") && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-itc-navy rounded-none animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-itc-navy rounded-none animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-itc-navy rounded-none animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {fase === "libre" && (
        <div className="bg-white border-t border-gray-100 px-4 py-4">
          <form
            onSubmit={handleEnviarMensaje}
            className="max-w-2xl mx-auto flex gap-3"
          >
            <input
              type="text"
              value={inputLocal}
              onChange={(e) => setInputLocal(e.target.value)}
              placeholder={fase === "libre"
                ? "Pregunta sobre cualquier carrera..."
                : "Escribe algo para comenzar..."
              }
              className={cn(
                "flex-1 px-4 py-3 rounded-none border border-gray-200",
                "focus:outline-none focus:ring-2 focus:ring-itc-navy/20 focus:border-itc-navy",
                "placeholder:text-gray-400"
              )}
            />
            <button
              type="submit"
              disabled={!inputLocal.trim() || status === "streaming"}
              className={cn(
                "bg-itc-navy text-white px-4 py-3 rounded-none",
                "hover:bg-itc-navy/90 transition-all",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "active:scale-95"
              )}
            >
              <IoSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
