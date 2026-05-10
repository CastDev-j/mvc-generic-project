"use client"

import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"
import { FaSignOutAlt } from "react-icons/fa"

interface HeaderITCProps {
  estadoConexion?: "conectado" | "desconectado" | "cargando"
}

export function HeaderITC({ estadoConexion = "conectado" }: HeaderITCProps) {
  const { logout } = useAuth()

  return (
    <header className="bg-itc-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-itc-navy font-bold text-lg">ITC</span>
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight">
              Asistente Vocacional
            </h1>
            <p className="text-itc-gold text-xs">
              Instituto Tecnológico de Celaya
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                estadoConexion === "conectado" && "bg-green-400",
                estadoConexion === "desconectado" && "bg-red-400",
                estadoConexion === "cargando" && "bg-yellow-400 animate-pulse"
              )}
            />
            <span className="text-xs text-white/70 hidden sm:inline">
              {estadoConexion === "conectado" && "IA Conectada"}
              {estadoConexion === "desconectado" && "Sin conexión"}
              {estadoConexion === "cargando" && "Procesando..."}
            </span>
          </div>

          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg",
              "bg-white/10 hover:bg-white/20 transition-colors",
              "text-sm"
            )}
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  )
}
