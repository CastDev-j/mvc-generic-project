// ===========================================
// MODELO: Variables del perfil vocacional
// 9 variables (V01-V09) que definen el perfil del estudiante
// ===========================================

export interface Variable {
  id: string
  nombre: string
  tipo: "escala" | "booleano" | "enum"
  descripcion: string
  valores?: string[] // Para tipo enum
  min?: number // Para tipo escala
  max?: number // Para tipo escala
}

export const VARIABLES: Variable[] = [
  {
    id: "V01",
    nombre: "mat",
    tipo: "escala",
    descripcion: "Interés y habilidad en matemáticas",
    min: 1,
    max: 5
  },
  {
    id: "V02",
    nombre: "prog",
    tipo: "escala",
    descripcion: "Interés en programación y desarrollo de software",
    min: 1,
    max: 5
  },
  {
    id: "V03",
    nombre: "quim",
    tipo: "escala",
    descripcion: "Interés en química y procesos químicos",
    min: 1,
    max: 5
  },
  {
    id: "V04",
    nombre: "bio",
    tipo: "escala",
    descripcion: "Interés en biología y ciencias de la vida",
    min: 1,
    max: 5
  },
  {
    id: "V05",
    nombre: "admin",
    tipo: "escala",
    descripcion: "Interés en administración y gestión empresarial",
    min: 1,
    max: 5
  },
  {
    id: "V06",
    nombre: "maquinas",
    tipo: "booleano",
    descripcion: "Interés en trabajar con máquinas y equipos mecánicos"
  },
  {
    id: "V07",
    nombre: "ambiente",
    tipo: "booleano",
    descripcion: "Interés en temas ambientales y sustentabilidad"
  },
  {
    id: "V08",
    nombre: "creatividad",
    tipo: "escala",
    descripcion: "Nivel de creatividad e innovación",
    min: 1,
    max: 5
  },
  {
    id: "V09",
    nombre: "trabajo",
    tipo: "enum",
    descripcion: "Ambiente de trabajo preferido",
    valores: ["oficina", "taller", "laboratorio", "campo", "mixto"]
  }
]

// Tipo para el perfil del estudiante
export interface PerfilEstudiante {
  mat: number
  prog: number
  quim: number
  bio: number
  admin: number
  maquinas: boolean
  ambiente: boolean
  creatividad: number
  trabajo: string
}

// Perfil vacío inicial
export const PERFIL_INICIAL: PerfilEstudiante = {
  mat: 0,
  prog: 0,
  quim: 0,
  bio: 0,
  admin: 0,
  maquinas: false,
  ambiente: false,
  creatividad: 0,
  trabajo: ""
}

export function getVariableById(id: string): Variable | undefined {
  return VARIABLES.find(v => v.id === id)
}

export function getVariableByNombre(nombre: string): Variable | undefined {
  return VARIABLES.find(v => v.nombre === nombre)
}
