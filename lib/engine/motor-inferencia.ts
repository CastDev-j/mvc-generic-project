// ===========================================
// CONTROLADOR: Motor de Inferencia
// Evalúa reglas y calcula afinidad de carreras
// ===========================================

import { REGLAS, type Regla, type Condicion } from '../data/reglas'
import { CARRERAS, type Carrera } from '../data/carreras'
import type { PerfilEstudiante } from '../data/variables'

export interface ResultadoCarrera {
  carrera: Carrera
  score: number
  porcentaje: number
  condicionesCumplidas: number
  totalCondiciones: number
}

/**
 * Evalúa una condición individual contra el perfil del estudiante
 */
function evalCondicion(condicion: Condicion, perfil: PerfilEstudiante): boolean {
  const valor = perfil[condicion.variable as keyof PerfilEstudiante]
  
  switch (condicion.operador) {
    case ">=":
      return typeof valor === "number" && valor >= (condicion.valor as number)
    
    case "=":
      return valor === condicion.valor
    
    case "IN":
      if (Array.isArray(condicion.valor)) {
        return condicion.valor.includes(valor as string)
      }
      return false
    
    default:
      return false
  }
}

/**
 * Evalúa una regla completa contra el perfil del estudiante
 * Maneja correctamente los grupos OR según la corrección R08
 */
function evalRegla(regla: Regla, perfil: PerfilEstudiante): { 
  cumple: boolean
  cumplidas: number
  total: number
} {
  const condiciones = regla.condiciones
  let cumplidas = 0
  let total = condiciones.length
  
  // Si hay grupo OR, evaluar diferente
  if (regla.orGroup !== undefined) {
    const condicionesNormales = condiciones.filter(c => c.grupo === undefined)
    const condicionesGrupo = condiciones.filter(c => c.grupo === regla.orGroup)
    
    // Evaluar condiciones normales con AND
    let normalCumplidas = 0
    for (const cond of condicionesNormales) {
      if (evalCondicion(cond, perfil)) {
        normalCumplidas++
        cumplidas++
      }
    }
    const baseOk = normalCumplidas === condicionesNormales.length
    
    // Evaluar grupo OR (al menos una debe cumplirse)
    let grupoOk = false
    for (const cond of condicionesGrupo) {
      if (evalCondicion(cond, perfil)) {
        grupoOk = true
        cumplidas++
        break // Solo necesitamos que una se cumpla
      }
    }
    
    // El grupo OR cuenta como 1 condición para el cálculo proporcional
    total = condicionesNormales.length + 1
    if (grupoOk) {
      cumplidas = normalCumplidas + 1
    }
    
    return {
      cumple: baseOk && grupoOk,
      cumplidas,
      total
    }
  }
  
  // Evaluación normal con AND para todas las condiciones
  for (const cond of condiciones) {
    if (evalCondicion(cond, perfil)) {
      cumplidas++
    }
  }
  
  return {
    cumple: cumplidas === total,
    cumplidas,
    total
  }
}

/**
 * Calcula el score de afinidad para una carrera específica
 */
function calcularScoreCarrera(regla: Regla, perfil: PerfilEstudiante): ResultadoCarrera | null {
  const carrera = CARRERAS.find(c => c.id === regla.carrera_id)
  if (!carrera) return null
  
  const evaluacion = evalRegla(regla, perfil)
  
  // Si cumple todas las condiciones, score completo
  // Si cumple parcialmente, score proporcional
  let scoreFinal: number
  if (evaluacion.cumple) {
    scoreFinal = regla.score
  } else {
    // Score parcial proporcional
    scoreFinal = (evaluacion.cumplidas / evaluacion.total) * regla.score
  }
  
  return {
    carrera,
    score: scoreFinal,
    porcentaje: Math.round(scoreFinal * 100),
    condicionesCumplidas: evaluacion.cumplidas,
    totalCondiciones: evaluacion.total
  }
}

/**
 * Función principal del motor de inferencia
 * Evalúa todas las reglas y devuelve las top 3 carreras recomendadas
 */
export function recomendar(perfil: PerfilEstudiante): ResultadoCarrera[] {
  const resultados: ResultadoCarrera[] = []
  
  // Evaluar cada regla
  for (const regla of REGLAS) {
    const resultado = calcularScoreCarrera(regla, perfil)
    if (resultado) {
      resultados.push(resultado)
    }
  }
  
  // Ordenar por score descendente
  resultados.sort((a, b) => b.score - a.score)
  
  // Devolver las top 3
  return resultados.slice(0, 3)
}

/**
 * Obtiene todas las carreras con su score de afinidad ordenadas
 */
export function obtenerTodasLasAfinidades(perfil: PerfilEstudiante): ResultadoCarrera[] {
  const resultados: ResultadoCarrera[] = []
  
  for (const regla of REGLAS) {
    const resultado = calcularScoreCarrera(regla, perfil)
    if (resultado) {
      resultados.push(resultado)
    }
  }
  
  resultados.sort((a, b) => b.score - a.score)
  return resultados
}

/**
 * Genera un resumen del perfil para inyectar al contexto de la IA
 * Incluye detalles de cada carrera recomendada para que el modelo pueda responder
 */
export function generarResumenPerfil(
  perfil: PerfilEstudiante, 
  resultados: ResultadoCarrera[]
): string {
  const carrerasRecomendadas = resultados
    .map((r, i) =>
      `${i + 1}. ${r.carrera.nombre} (${r.porcentaje}% de afinidad)
   Descripción: ${r.carrera.descripcion}
   Campo laboral: ${r.carrera.campo_laboral.slice(0, 3).join(", ")}
   Perfil ideal: ${r.carrera.perfil_ideal.join(", ")}
   Duración: ${r.carrera.duracion}`
    )
    .join("\n\n")
  
  return `Mi perfil vocacional:
- Matemáticas: ${perfil.mat}/5
- Programación: ${perfil.prog}/5
- Química: ${perfil.quim}/5
- Biología: ${perfil.bio}/5
- Administración: ${perfil.admin}/5
- Interés en máquinas: ${perfil.maquinas ? "Sí" : "No"}
- Interés ambiental: ${perfil.ambiente ? "Sí" : "No"}
- Creatividad: ${perfil.creatividad}/5
- Ambiente de trabajo preferido: ${perfil.trabajo}

Las carreras recomendadas para mí (basado en mi perfil) son:
${carrerasRecomendadas}`
}
