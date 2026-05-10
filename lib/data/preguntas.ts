// ===========================================
// MODELO: Preguntas conversacionales
// Mapeo de cada variable a preguntas en lenguaje natural
// ===========================================

export type TipoPregunta = "escala" | "booleano" | "enum"

export interface Pregunta {
  id: string
  variable: string
  texto: string
  tipo: TipoPregunta
  icon: string
  categoria: string
  opciones?: { valor: string | number | boolean; etiqueta: string }[]
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: "P01",
    variable: "mat",
    texto: "¿Qué tanto disfrutas resolver problemas matemáticos y trabajar con números?",
    tipo: "escala",
    icon: "FaCalculator",
    categoria: "Matemáticas",
    opciones: [
      { valor: 1, etiqueta: "Nada" },
      { valor: 2, etiqueta: "Poco" },
      { valor: 3, etiqueta: "Regular" },
      { valor: 4, etiqueta: "Bastante" },
      { valor: 5, etiqueta: "Me encanta" }
    ]
  },
  {
    id: "P02",
    variable: "prog",
    texto: "¿Qué tanto te interesa la programación y crear software o aplicaciones?",
    tipo: "escala",
    icon: "FaCode",
    categoria: "Programación",
    opciones: [
      { valor: 1, etiqueta: "Nada" },
      { valor: 2, etiqueta: "Poco" },
      { valor: 3, etiqueta: "Regular" },
      { valor: 4, etiqueta: "Bastante" },
      { valor: 5, etiqueta: "Me apasiona" }
    ]
  },
  {
    id: "P03",
    variable: "quim",
    texto: "¿Te llama la atención la química, las reacciones y los procesos químicos?",
    tipo: "escala",
    icon: "FaFlask",
    categoria: "Química",
    opciones: [
      { valor: 1, etiqueta: "Nada" },
      { valor: 2, etiqueta: "Poco" },
      { valor: 3, etiqueta: "Regular" },
      { valor: 4, etiqueta: "Bastante" },
      { valor: 5, etiqueta: "Me fascina" }
    ]
  },
  {
    id: "P04",
    variable: "bio",
    texto: "¿Qué tanto te interesan la biología y las ciencias de la vida?",
    tipo: "escala",
    icon: "FaLeaf",
    categoria: "Biología",
    opciones: [
      { valor: 1, etiqueta: "Nada" },
      { valor: 2, etiqueta: "Poco" },
      { valor: 3, etiqueta: "Regular" },
      { valor: 4, etiqueta: "Bastante" },
      { valor: 5, etiqueta: "Me apasiona" }
    ]
  },
  {
    id: "P05",
    variable: "admin",
    texto: "¿Te ves liderando equipos, tomando decisiones empresariales o gestionando proyectos?",
    tipo: "escala",
    icon: "FaBriefcase",
    categoria: "Administración",
    opciones: [
      { valor: 1, etiqueta: "Para nada" },
      { valor: 2, etiqueta: "Poco" },
      { valor: 3, etiqueta: "Tal vez" },
      { valor: 4, etiqueta: "Sí, bastante" },
      { valor: 5, etiqueta: "Definitivamente" }
    ]
  },
  {
    id: "P06",
    variable: "maquinas",
    texto: "¿Te gusta desarmar cosas, trabajar con máquinas o entender cómo funcionan los mecanismos?",
    tipo: "booleano",
    icon: "FaCogs",
    categoria: "Mecánica",
    opciones: [
      { valor: true, etiqueta: "Sí, me encanta" },
      { valor: false, etiqueta: "No es lo mío" }
    ]
  },
  {
    id: "P07",
    variable: "ambiente",
    texto: "¿Te preocupan los temas ambientales y te gustaría contribuir a un mundo más sustentable?",
    tipo: "booleano",
    icon: "FaGlobeAmericas",
    categoria: "Ambiente",
    opciones: [
      { valor: true, etiqueta: "Sí, definitivamente" },
      { valor: false, etiqueta: "No es mi prioridad" }
    ]
  },
  {
    id: "P08",
    variable: "creatividad",
    texto: "¿Qué tan creativo e innovador te consideras?",
    tipo: "escala",
    icon: "FaLightbulb",
    categoria: "Creatividad",
    opciones: [
      { valor: 1, etiqueta: "Poco creativo" },
      { valor: 2, etiqueta: "Algo" },
      { valor: 3, etiqueta: "Normal" },
      { valor: 4, etiqueta: "Bastante" },
      { valor: 5, etiqueta: "Muy creativo" }
    ]
  },
  {
    id: "P09",
    variable: "trabajo",
    texto: "En que tipo de ambiente te gustaria trabajar en el futuro?",
    tipo: "enum",
    icon: "FaBuilding",
    categoria: "Entorno laboral",
    opciones: [
      { valor: "oficina", etiqueta: "Oficina" },
      { valor: "taller", etiqueta: "Taller / Planta" },
      { valor: "laboratorio", etiqueta: "Laboratorio" },
      { valor: "campo", etiqueta: "Campo / Aire libre" },
      { valor: "mixto", etiqueta: "Mixto / Variado" }
    ]
  }
]

export function getPreguntaByVariable(variable: string): Pregunta | undefined {
  return PREGUNTAS.find(p => p.variable === variable)
}

export function getPreguntaById(id: string): Pregunta | undefined {
  return PREGUNTAS.find(p => p.id === id)
}
