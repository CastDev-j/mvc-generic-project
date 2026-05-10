"use client"

import { useAuth } from "@/lib/auth/auth-context"
import { FaSignOutAlt, FaCog } from "react-icons/fa"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const { logout } = useAuth()

  return (
    <header className="bg-itc-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-itc-gold rounded-[8px] flex items-center justify-center">
            <FaCog className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight text-white">
              Panel de Administración
            </h1>
            <p className="text-itc-gold text-xs">
              Sistema Experto Vocacional - ITC
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-none",
            "bg-white/10 hover:bg-white/20 transition-colors",
            "text-sm font-medium"
          )}
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  )
}
