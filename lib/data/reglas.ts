// ===========================================
// MODELO: Reglas de inferencia
// 13 reglas con condiciones y scores de afinidad
// ===========================================

export interface Condicion {
  variable: string
  operador: ">=" | "=" | "IN"
  valor: number | boolean | string | string[]
  grupo?: number // Para agrupar condiciones con OR
  conector?: "AND" | "OR"
}

export interface Regla {
  id: string
  carrera_id: string
  score: number
  condiciones: Condicion[]
  orGroup?: number // Indica qué grupo usar para evaluación OR
}

export const REGLAS: Regla[] = [
  // R01 - Ingeniería en Sistemas Computacionales
  {
    id: "R01",
    carrera_id: "ISC",
    score: 0.92,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 4 },
      { variable: "prog", operador: ">=", valor: 4 },
      { variable: "creatividad", operador: ">=", valor: 3 },
      { variable: "trabajo", operador: "IN", valor: ["oficina", "mixto"] }
    ]
  },
  // R02 - Ingeniería Industrial
  {
    id: "R02",
    carrera_id: "IIN",
    score: 0.90,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "admin", operador: ">=", valor: 3 },
      { variable: "trabajo", operador: "IN", valor: ["taller", "oficina", "mixto"] }
    ]
  },
  // R03 - Ingeniería Mecatrónica
  {
    id: "R03",
    carrera_id: "IME",
    score: 0.94,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 4 },
      { variable: "prog", operador: ">=", valor: 3 },
      { variable: "maquinas", operador: "=", valor: true },
      { variable: "creatividad", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["taller", "laboratorio"] }
    ]
  },
  // R04 - Ingeniería Electrónica
  {
    id: "R04",
    carrera_id: "IEL",
    score: 0.91,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 4 },
      { variable: "prog", operador: ">=", valor: 3 },
      { variable: "maquinas", operador: "=", valor: true },
      { variable: "trabajo", operador: "IN", valor: ["taller", "laboratorio", "mixto"] }
    ]
  },
  // R05 - Ingeniería Mecánica
  {
    id: "R05",
    carrera_id: "IMC",
    score: 0.89,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 4 },
      { variable: "maquinas", operador: "=", valor: true },
      { variable: "trabajo", operador: "IN", valor: ["taller", "campo"] }
    ]
  },
  // R06 - Ingeniería Química
  {
    id: "R06",
    carrera_id: "IQU",
    score: 0.88,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "quim", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["laboratorio", "taller"] }
    ]
  },
  // R07 - Ingeniería en Gestión Empresarial
  {
    id: "R07",
    carrera_id: "IGE",
    score: 0.87,
    condiciones: [
      { variable: "admin", operador: ">=", valor: 4 },
      { variable: "creatividad", operador: ">=", valor: 3 },
      { variable: "trabajo", operador: "IN", valor: ["oficina", "mixto"] }
    ]
  },
  // R08 - Ingeniería Bioquímica (con grupo OR corregido)
  {
    id: "R08",
    carrera_id: "IBQ",
    score: 0.90,
    orGroup: 1,
    condiciones: [
      { variable: "bio", operador: ">=", valor: 4 },
      { variable: "quim", operador: ">=", valor: 3 },
      // Grupo OR: ambiente=true OR trabajo=laboratorio
      { variable: "ambiente", operador: "=", valor: true, grupo: 1, conector: "OR" },
      { variable: "trabajo", operador: "=", valor: "laboratorio", grupo: 1, conector: "OR" }
    ]
  },
  // R09 - Licenciatura en Administración
  {
    id: "R09",
    carrera_id: "LAE",
    score: 0.85,
    condiciones: [
      { variable: "admin", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["oficina"] }
    ]
  },
  // R10 - Ingeniería en Materiales
  {
    id: "R10",
    carrera_id: "IMA",
    score: 0.86,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "quim", operador: ">=", valor: 3 },
      { variable: "creatividad", operador: ">=", valor: 3 },
      { variable: "trabajo", operador: "IN", valor: ["laboratorio", "taller"] }
    ]
  },
  // R11 - Ingeniería en Energías Renovables
  {
    id: "R11",
    carrera_id: "IER",
    score: 0.88,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "ambiente", operador: "=", valor: true },
      { variable: "trabajo", operador: "IN", valor: ["campo", "taller", "mixto"] }
    ]
  },
  // R12 - Ingeniería en Desarrollo de Software
  {
    id: "R12",
    carrera_id: "IDS",
    score: 0.93,
    condiciones: [
      { variable: "prog", operador: ">=", valor: 5 },
      { variable: "creatividad", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["oficina", "mixto"] }
    ]
  },
  // R13 - Ingeniería en Inteligencia Artificial
  {
    id: "R13",
    carrera_id: "IIA",
    score: 0.95,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 5 },
      { variable: "prog", operador: ">=", valor: 4 },
      { variable: "creatividad", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["oficina", "laboratorio", "mixto"] }
    ]
  },
  // R14 - Ingeniería Civil
  {
    id: "R14",
    carrera_id: "ICV",
    score: 0.87,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "maquinas", operador: "=", valor: true },
      { variable: "trabajo", operador: "IN", valor: ["campo", "taller", "mixto"] }
    ]
  },
  // R15 - Ingeniería en Logística
  {
    id: "R15",
    carrera_id: "ILOG",
    score: 0.85,
    condiciones: [
      { variable: "mat", operador: ">=", valor: 3 },
      { variable: "admin", operador: ">=", valor: 3 },
      { variable: "trabajo", operador: "IN", valor: ["oficina", "mixto"] }
    ]
  },
  // R16 - Contador Público
  {
    id: "R16",
    carrera_id: "CP",
    score: 0.84,
    condiciones: [
      { variable: "admin", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "=", valor: "oficina" }
    ]
  },
  // R17 - Ingeniería en Diseño Industrial
  {
    id: "R17",
    carrera_id: "IDI",
    score: 0.86,
    condiciones: [
      { variable: "creatividad", operador: ">=", valor: 4 },
      { variable: "trabajo", operador: "IN", valor: ["taller", "oficina"] }
    ]
  }
]

export function getReglaById(id: string): Regla | undefined {
  return REGLAS.find(r => r.id === id)
}

export function getReglasByCarrera(carreraId: string): Regla[] {
  return REGLAS.filter(r => r.carrera_id === carreraId)
}
