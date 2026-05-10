"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FaGraduationCap, FaQuestionCircle, FaCodeBranch, FaChartBar } from "react-icons/fa"
import { AdminHeader } from "./admin-header"
import { AdminCarreras } from "./admin-carreras"
import { AdminPreguntas } from "./admin-preguntas"
import { AdminReglas } from "./admin-reglas"
import { CARRERAS } from "@/lib/data/carreras"
import { PREGUNTAS } from "@/lib/data/preguntas"
import { REGLAS } from "@/lib/data/reglas"

type TabAdmin = "dashboard" | "carreras" | "preguntas" | "reglas"

export function AdminDashboard() {
  const [tabActual, setTabActual] = useState<TabAdmin>("dashboard")

  const tabs = [
    { id: "dashboard" as TabAdmin, label: "Dashboard", icon: FaChartBar },
    { id: "carreras" as TabAdmin, label: "Carreras", icon: FaGraduationCap },
    { id: "preguntas" as TabAdmin, label: "Preguntas", icon: FaQuestionCircle },
    { id: "reglas" as TabAdmin, label: "Reglas", icon: FaCodeBranch },
  ]

  const stats = [
    { label: "Carreras", value: CARRERAS.length, icon: FaGraduationCap, color: "bg-blue-500" },
    { label: "Preguntas", value: PREGUNTAS.length, icon: FaQuestionCircle, color: "bg-green-500" },
    { label: "Reglas", value: REGLAS.length, icon: FaCodeBranch, color: "bg-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActual(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-none font-medium transition-all whitespace-nowrap",
                tabActual === tab.id
                  ? "bg-itc-navy text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {tabActual === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
              <p className="text-gray-500">Resumen del sistema experto vocacional</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-none p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-[10px] flex items-center justify-center",
                      stat.color
                    )}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-gray-500 text-sm">{stat.label} registradas</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Arquitectura del Sistema</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-none border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">Modelo (Datos)</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>- Base de conocimientos</li>
                    <li>- Carreras del ITC</li>
                    <li>- Variables del perfil</li>
                    <li>- Reglas de inferencia</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-none border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">Vista (Interfaz)</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>- Interfaz de usuario</li>
                    <li>- Panel de administración</li>
                    <li>- Chat vocacional</li>
                    <li>- Resultados visuales</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-none border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">Controlador (Motor)</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>- Motor de inferencia</li>
                    <li>- Encadenamiento adelante</li>
                    <li>- Gemini IA</li>
                    <li>- Cálculo de afinidad</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-itc-navy/5 rounded-none p-6 border border-itc-navy/10">
              <h3 className="text-lg font-bold text-itc-navy mb-2">Sistema Experto Vocacional</h3>
              <p className="text-gray-600 text-sm">
                Este sistema utiliza un motor de inferencia basado en reglas con encadenamiento hacia adelante,
                combinado con Inteligencia Artificial (Gemini) para proporcionar recomendaciones personalizadas
                de carreras del Instituto Tecnológico de Celaya.
              </p>
            </div>
          </div>
        )}

        {tabActual === "carreras" && <AdminCarreras />}
        {tabActual === "preguntas" && <AdminPreguntas />}
        {tabActual === "reglas" && <AdminReglas />}
      </div>
    </div>
  )
}
