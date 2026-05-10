"use client"

import { cn } from "@/lib/utils"
import { useAuth, type Rol } from "@/lib/auth/auth-context"
import { FaUserGraduate, FaUserCog } from "react-icons/fa"

export function LoginSelector() {
  const { setRol } = useAuth()

  const handleSelectRol = (rol: Rol) => {
    setRol(rol)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-itc-navy via-itc-navy/95 to-itc-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-[16px] mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden p-1">
            <img src="/logo.jpg" alt="ITC Celaya" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Asistente Vocacional IA
          </h1>
          <p className="text-white/70">
            Instituto Tecnológico de Celaya
          </p>
        </div>

        <div className="bg-white rounded-none shadow-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Selecciona tu rol para continuar
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => handleSelectRol("usuario")}
              className={cn(
                "w-full p-4 rounded-none border-2 border-gray-200",
                "hover:border-itc-navy hover:bg-itc-navy/5",
                "transition-all duration-200 group",
                "flex items-center gap-4"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-[12px] flex items-center justify-center",
                "bg-itc-navy/10 group-hover:bg-itc-navy",
                "transition-colors duration-200"
              )}>
                <FaUserGraduate className={cn(
                  "w-7 h-7 text-itc-navy group-hover:text-white",
                  "transition-colors duration-200"
                )} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Estudiante
                </h3>
                <p className="text-gray-500 text-sm">
                  Descubre tu carrera ideal con el test vocacional
                </p>
              </div>
            </button>

            <button
              onClick={() => handleSelectRol("admin")}
              className={cn(
                "w-full p-4 rounded-none border-2 border-gray-200",
                "hover:border-itc-gold hover:bg-itc-gold/5",
                "transition-all duration-200 group",
                "flex items-center gap-4"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-[12px] flex items-center justify-center",
                "bg-itc-gold/10 group-hover:bg-itc-gold",
                "transition-colors duration-200"
              )}>
                <FaUserCog className={cn(
                  "w-7 h-7 text-itc-gold group-hover:text-white",
                  "transition-colors duration-200"
                )} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Administrador
                </h3>
                <p className="text-gray-500 text-sm">
                  Gestiona carreras, preguntas y reglas del sistema
                </p>
              </div>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Sistema Experto con IA - TecNM Campus Celaya
          </p>
        </div>
      </div>
    </div>
  )
}
