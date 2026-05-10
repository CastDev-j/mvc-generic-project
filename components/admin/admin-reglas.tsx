"use client"

import { useState } from "react"
import { REGLAS, type Regla } from "@/lib/data/reglas"
import { cn } from "@/lib/utils"
import { FaEdit, FaTrash, FaPlus, FaCodeBranch, FaArrowRight } from "react-icons/fa"

export function AdminReglas() {
  const [reglas, setReglas] = useState<Regla[]>(REGLAS)
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta regla?")) {
      setReglas(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Motor de Inferencia</h2>
          <p className="text-gray-500">Administra las reglas del sistema experto</p>
        </div>
        <button
          onClick={() => setMostrarModal(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-none",
            "bg-itc-navy text-white hover:bg-itc-navy/90",
            "transition-colors font-medium"
          )}
        >
          <FaPlus className="w-4 h-4" />
          Nueva Regla
        </button>
      </div>

      <div className="bg-itc-gold/10 border border-itc-gold/30 rounded-none p-4">
        <h4 className="font-semibold text-itc-navy mb-1">Encadenamiento hacia adelante</h4>
        <p className="text-sm text-gray-600">
          El sistema evalúa las condiciones (SI) y cuando se cumplen, ejecuta las acciones (ENTONCES)
          para calcular la afinidad con cada carrera.
        </p>
      </div>

      <div className="space-y-4">
        {reglas.map((regla, index) => (
          <div
            key={regla.id}
            className="bg-white rounded-none border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-itc-navy text-white rounded-[8px] flex items-center justify-center text-sm font-bold">
                    R{index + 1}
                  </span>
                  <FaCodeBranch className="w-4 h-4 text-itc-gold" />
                  <span className="text-sm text-gray-500">
                    Score: <span className="font-semibold text-itc-navy">{regla.score}</span>
                  </span>
                </div>

                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-none mb-2">
                    SI
                  </span>
                  <div className="ml-4 space-y-1">
                    {regla.condiciones.map((cond, i) => (
                      <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-none"></span>
                        <span className="font-mono bg-gray-100 px-1 rounded-none">{cond.variable}</span>
                        <span className="text-gray-400">{cond.operador}</span>
                        <span className="font-semibold">{String(cond.valor)}</span>
                        {i < regla.condiciones.length - 1 && (
                          <span className="text-xs text-gray-400 ml-2">Y</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-none mb-2">
                    <FaArrowRight className="w-3 h-3" />
                    ENTONCES
                  </span>
                  <div className="ml-4 text-sm text-gray-700">
                    Recomendar: <span className="font-semibold text-itc-navy">{regla.carrera_id}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setMostrarModal(true)}
                  className="p-2 rounded-none hover:bg-gray-100 text-gray-600 hover:text-itc-navy transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEliminar(regla.id)}
                  className="p-2 rounded-none hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Gestión de Regla
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Funcionalidad de edición disponible en versión completa
            </p>
            <button
              onClick={() => setMostrarModal(false)}
              className="w-full py-2 bg-itc-navy text-white rounded-none hover:bg-itc-navy/90"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
