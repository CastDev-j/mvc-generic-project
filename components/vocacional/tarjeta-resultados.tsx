"use client"

import { cn } from "@/lib/utils"
import type { ResultadoCarrera } from "@/lib/engine/motor-inferencia"
import { FaTrophy, FaMedal, FaAward, FaBullseye, FaComments } from "react-icons/fa"

interface TarjetaResultadosProps {
  resultados: ResultadoCarrera[]
  className?: string
}

const MEDALLAS = [
  <FaTrophy key="1" className="w-6 h-6 text-yellow-500" />,
  <FaMedal key="2" className="w-6 h-6 text-gray-400" />,
  <FaAward key="3" className="w-6 h-6 text-amber-600" />
]

export function TarjetaResultados({ resultados, className }: TarjetaResultadosProps) {
  return (
    <div className={cn(
      "bg-white rounded-none shadow-lg border border-gray-100 overflow-hidden",
      className
    )}>
      <div className="bg-gradient-to-r from-itc-navy to-itc-navy/90 px-6 py-4">
        <h3 className="text-white font-serif text-xl font-bold flex items-center gap-2">
          <FaBullseye className="w-5 h-5" />
          Carreras Recomendadas
        </h3>
        <p className="text-white/80 text-sm mt-1">
          Basado en tu perfil vocacional
        </p>
      </div>

      <div className="p-4 space-y-4">
        {resultados.map((resultado, index) => (
          <div
            key={resultado.carrera.id}
            className={cn(
              "p-4 rounded-none transition-all hover:shadow-md",
              index === 0 ? "bg-itc-gold/10 border-2 border-itc-gold" : "bg-gray-50 border border-gray-100"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">{MEDALLAS[index]}</div>
              <div className="flex-1">
                <h4 className="font-bold text-itc-navy text-lg">
                  {resultado.carrera.nombre}
                </h4>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {resultado.carrera.descripcion}
                </p>

                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Afinidad</span>
                    <span className={cn(
                      "text-sm font-bold",
                      resultado.porcentaje >= 80 ? "text-green-600" :
                      resultado.porcentaje >= 60 ? "text-itc-gold" : "text-gray-600"
                    )}>
                      {resultado.porcentaje}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-none overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-none transition-all duration-700",
                        resultado.porcentaje >= 80
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : resultado.porcentaje >= 60
                            ? "bg-gradient-to-r from-itc-gold to-yellow-500"
                            : "bg-gradient-to-r from-gray-400 to-gray-500"
                      )}
                      style={{ width: `${resultado.porcentaje}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {resultado.carrera.campo_laboral.slice(0, 3).map((campo, i) => (
                    <span
                      key={i}
                      className="text-xs bg-itc-navy/10 text-itc-navy px-2 py-0.5 rounded-none"
                    >
                      {campo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center flex items-center justify-center gap-2">
          <FaComments className="w-4 h-4 text-itc-navy" />
          Preguntame mas sobre cualquiera de estas carreras
        </p>
      </div>
    </div>
  )
}
