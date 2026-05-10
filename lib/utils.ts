import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  FaCalculator,
  FaCode,
  FaFlask,
  FaLeaf,
  FaBriefcase,
  FaCogs,
  FaGlobeAmericas,
  FaLightbulb,
  FaBuilding,
} from "react-icons/fa"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IconMap = {
  FaCalculator,
  FaCode,
  FaFlask,
  FaLeaf,
  FaBriefcase,
  FaCogs,
  FaGlobeAmericas,
  FaLightbulb,
  FaBuilding,
} as const
