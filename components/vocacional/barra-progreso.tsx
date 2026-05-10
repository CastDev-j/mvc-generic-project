"use client"

import { cn } from "@/lib/utils"

interface BarraProgresoProps {
  progreso: number
  className?: string
}

export function BarraProgreso({ progreso, className }: BarraProgresoProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-itc-navy">Progreso del cuestionario</span>
        <span className="text-sm font-bold text-itc-gold">{Math.round(progreso)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-itc-navy to-itc-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progreso}%` }}
        />
      </div>
    </div>
  )
}
