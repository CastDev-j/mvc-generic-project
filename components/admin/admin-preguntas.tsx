"use client"

import { useState } from "react"
import { PREGUNTAS, type Pregunta } from "@/lib/data/preguntas"
import { cn } from "@/lib/utils"
import { IconMap } from "@/lib/utils"
import { FaEdit, FaTrash, FaPlus, FaQuestionCircle, FaListUl } from "react-icons/fa"

export function AdminPreguntas() {
  const [preguntas, setPreguntas] = useState<Pregunta[]>(PREGUNTAS)
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
      setPreguntas(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Preguntas</h2>
          <p className="text-gray-500">Administra las preguntas del cuestionario vocacional</p>
        </div>
        <button
          onClick={() => setMostrarModal(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-itc-navy text-white hover:bg-itc-navy/90",
            "transition-colors font-medium"
          )}
        >
          <FaPlus className="w-4 h-4" />
          Nueva Pregunta
        </button>
      </div>

      <div className="space-y-4">
        {preguntas.map((pregunta, index) => {
          const Icono = IconMap[pregunta.icon as keyof typeof IconMap]
          return (
            <div
              key={pregunta.id}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-itc-navy/10 text-itc-navy rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Variable: {pregunta.variable}
                    </span>
                    {Icono && (
                      <span className="inline-flex items-center gap-1 text-xs bg-itc-gold/10 text-itc-gold px-2 py-1 rounded">
                        <Icono className="w-3 h-3" />
                        {pregunta.categoria}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <FaQuestionCircle className="w-5 h-5 text-itc-gold mt-0.5 shrink-0" />
                    <p className="text-gray-800 font-medium">
                      {pregunta.texto}
                    </p>
                  </div>

                  {pregunta.opciones && (
                    <div className="mt-3 ml-7">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <FaListUl className="w-3 h-3" />
                        <span>Opciones de respuesta:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pregunta.opciones.map((opcion, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded"
                          >
                            {opcion.etiqueta}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setMostrarModal(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-itc-navy transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEliminar(pregunta.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Gestión de Pregunta
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Funcionalidad de edición disponible en versión completa
            </p>
            <button
              onClick={() => setMostrarModal(false)}
              className="w-full py-2 bg-itc-navy text-white rounded-lg hover:bg-itc-navy/90"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
