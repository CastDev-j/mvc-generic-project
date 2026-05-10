"use client"

import { useState } from "react"
import { CARRERAS, type Carrera } from "@/lib/data/carreras"
import { cn } from "@/lib/utils"
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBriefcase, FaBook } from "react-icons/fa"

export function AdminCarreras() {
  const [carreras, setCarreras] = useState<Carrera[]>(CARRERAS)
  const [busqueda, setBusqueda] = useState("")
  const [carreraEditando, setCarreraEditando] = useState<Carrera | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  const carrerasFiltradas = carreras.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta carrera?")) {
      setCarreras(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleEditar = (carrera: Carrera) => {
    setCarreraEditando(carrera)
    setMostrarModal(true)
  }

  const handleNueva = () => {
    setCarreraEditando(null)
    setMostrarModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Carreras</h2>
          <p className="text-gray-500">Administra las carreras disponibles en el sistema</p>
        </div>
        <button
          onClick={handleNueva}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-none",
            "bg-itc-navy text-white hover:bg-itc-navy/90",
            "transition-colors font-medium"
          )}
        >
          <FaPlus className="w-4 h-4" />
          Nueva Carrera
        </button>
      </div>

      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar carrera..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={cn(
            "w-full pl-10 pr-4 py-3 rounded-none border border-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-itc-navy/20 focus:border-itc-navy"
          )}
        />
      </div>

      <div className="grid gap-4">
        {carrerasFiltradas.map((carrera) => (
          <div
            key={carrera.id}
            className="bg-white rounded-none border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {carrera.nombre}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {carrera.descripcion}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <FaBriefcase className="w-4 h-4 text-itc-navy" />
                    <span>{carrera.campo_laboral.length} campos laborales</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <FaBook className="w-4 h-4 text-itc-gold" />
                    <span>{carrera.materias.length} materias clave</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {carrera.perfil_ideal.slice(0, 3).map((perfil, i) => (
                    <span
                      key={i}
                      className="text-xs bg-itc-navy/10 text-itc-navy px-2 py-1 rounded-none"
                    >
                      {perfil}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEditar(carrera)}
                  className="p-2 rounded-none hover:bg-gray-100 text-gray-600 hover:text-itc-navy transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEliminar(carrera.id)}
                  className="p-2 rounded-none hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {carrerasFiltradas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron carreras con ese criterio de búsqueda
        </div>
      )}

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {carreraEditando ? "Editar Carrera" : "Nueva Carrera"}
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
