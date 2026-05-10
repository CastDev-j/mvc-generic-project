"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Rol = "usuario" | "admin" | null

interface AuthContextType {
  rol: Rol
  setRol: (rol: Rol) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [rol, setRol] = useState<Rol>(null)

  const logout = () => {
    setRol(null)
  }

  return (
    <AuthContext.Provider value={{ rol, setRol, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
