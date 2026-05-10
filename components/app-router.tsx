"use client"

import { useAuth } from "@/lib/auth/auth-context"
import { LoginSelector } from "@/components/login/login-selector"
import { AsistenteVocacional } from "@/components/vocacional/asistente-vocacional"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export function AppRouter() {
  const { rol } = useAuth()

  // Si no hay rol seleccionado, mostrar login
  if (!rol) {
    return <LoginSelector />
  }

  // Mostrar vista según rol
  if (rol === "admin") {
    return <AdminDashboard />
  }

  // Vista de usuario (estudiante)
  return <AsistenteVocacional />
}
