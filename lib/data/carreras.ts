// ===========================================
// MODELO: Carreras del ITC Celaya
// Base de datos embebida - 13 carreras
// ===========================================

export interface Carrera {
  id: string
  nombre: string
  descripcion: string
  campo_laboral: string[]
  materias: string[]
  perfil_ideal: string[]
  duracion: string
}

export const CARRERAS: Carrera[] = [
  {
    id: "ISC",
    nombre: "Ingeniería en Sistemas Computacionales",
    descripcion: "Forma profesionales capaces de diseñar, desarrollar, implementar y administrar sistemas de software, redes de computadoras y soluciones tecnológicas innovadoras.",
    campo_laboral: ["Desarrollo de software", "Administración de sistemas", "Ciberseguridad", "Inteligencia artificial", "Consultoría TI"],
    materias: ["Programación", "Bases de datos", "Redes", "Sistemas operativos", "Ingeniería de software"],
    perfil_ideal: ["Pensamiento lógico", "Gusto por la tecnología", "Resolución de problemas", "Trabajo en equipo"],
    duracion: "9 semestres"
  },
  {
    id: "IIN",
    nombre: "Ingeniería Industrial",
    descripcion: "Optimiza sistemas productivos integrando recursos humanos, materiales, tecnológicos y financieros para mejorar la productividad y competitividad de las organizaciones.",
    campo_laboral: ["Producción", "Logística", "Control de calidad", "Recursos humanos", "Consultoría empresarial"],
    materias: ["Estudio del trabajo", "Logística", "Control de calidad", "Seguridad industrial", "Gestión de proyectos"],
    perfil_ideal: ["Liderazgo", "Pensamiento analítico", "Organización", "Comunicación efectiva"],
    duracion: "9 semestres"
  },
  {
    id: "IME",
    nombre: "Ingeniería Mecatrónica",
    descripcion: "Integra mecánica, electrónica, sistemas de control e informática para diseñar y desarrollar productos y procesos automatizados inteligentes.",
    campo_laboral: ["Automatización industrial", "Robótica", "Diseño mecatrónico", "Manufactura avanzada", "Investigación y desarrollo"],
    materias: ["Mecánica", "Electrónica", "Control", "Programación", "Robótica"],
    perfil_ideal: ["Creatividad", "Habilidad manual", "Pensamiento sistémico", "Innovación"],
    duracion: "9 semestres"
  },
  {
    id: "IEL",
    nombre: "Ingeniería Electrónica",
    descripcion: "Diseña, desarrolla e implementa sistemas electrónicos analógicos y digitales, sistemas de comunicaciones y control automático.",
    campo_laboral: ["Telecomunicaciones", "Diseño electrónico", "Automatización", "Instrumentación", "Desarrollo de hardware"],
    materias: ["Circuitos eléctricos", "Electrónica digital", "Comunicaciones", "Control", "Microcontroladores"],
    perfil_ideal: ["Aptitud matemática", "Interés en electrónica", "Precisión", "Capacidad analítica"],
    duracion: "9 semestres"
  },
  {
    id: "IMC",
    nombre: "Ingeniería Mecánica",
    descripcion: "Diseña, desarrolla, manufactura y mantiene sistemas mecánicos, máquinas y equipos industriales con criterios de sustentabilidad.",
    campo_laboral: ["Diseño mecánico", "Manufactura", "Mantenimiento industrial", "Energías renovables", "Automotriz"],
    materias: ["Termodinámica", "Mecánica de fluidos", "Diseño de máquinas", "Manufactura", "Materiales"],
    perfil_ideal: ["Interés en máquinas", "Habilidad espacial", "Trabajo práctico", "Resistencia física"],
    duracion: "9 semestres"
  },
  {
    id: "IBQ",
    nombre: "Ingeniería Bioquímica",
    descripcion: "Aplica los principios de la ingeniería a procesos biológicos para producir bienes y servicios en las industrias alimentaria, farmacéutica y ambiental.",
    campo_laboral: ["Industria alimentaria", "Farmacéutica", "Biotecnología", "Control de calidad", "Investigación"],
    materias: ["Bioquímica", "Microbiología", "Procesos biotecnológicos", "Control de calidad", "Bioprocesos"],
    perfil_ideal: ["Interés en ciencias naturales", "Meticulosidad", "Trabajo en laboratorio", "Responsabilidad ambiental"],
    duracion: "9 semestres"
  },
  {
    id: "IQU",
    nombre: "Ingeniería Química",
    descripcion: "Diseña, opera y optimiza procesos de transformación de materias primas en productos químicos útiles para la sociedad.",
    campo_laboral: ["Industria petroquímica", "Procesos químicos", "Tratamiento de aguas", "Industria de polímeros", "Energía"],
    materias: ["Química orgánica", "Termodinámica", "Operaciones unitarias", "Reactores", "Procesos industriales"],
    perfil_ideal: ["Interés en química", "Pensamiento analítico", "Trabajo en planta", "Seguridad industrial"],
    duracion: "9 semestres"
  },
  {
    id: "IGE",
    nombre: "Ingeniería en Gestión Empresarial",
    descripcion: "Forma líderes empresariales con visión estratégica capaces de crear, dirigir y desarrollar organizaciones competitivas.",
    campo_laboral: ["Dirección de empresas", "Consultoría", "Emprendimiento", "Finanzas", "Marketing estratégico"],
    materias: ["Administración", "Finanzas", "Mercadotecnia", "Gestión de proyectos", "Liderazgo"],
    perfil_ideal: ["Liderazgo", "Visión estratégica", "Comunicación", "Emprendimiento"],
    duracion: "9 semestres"
  },
  {
    id: "LAE",
    nombre: "Licenciatura en Administración",
    descripcion: "Gestiona y optimiza recursos organizacionales para lograr los objetivos empresariales con eficiencia y responsabilidad social.",
    campo_laboral: ["Administración general", "Recursos humanos", "Finanzas corporativas", "Operaciones", "Consultoría"],
    materias: ["Administración", "Contabilidad", "Finanzas", "Recursos humanos", "Derecho empresarial"],
    perfil_ideal: ["Organización", "Habilidades interpersonales", "Pensamiento estratégico", "Ética profesional"],
    duracion: "8 semestres"
  },
  {
    id: "IMA",
    nombre: "Ingeniería en Materiales",
    descripcion: "Selecciona, procesa y caracteriza materiales para aplicaciones industriales específicas con criterios de innovación y sustentabilidad.",
    campo_laboral: ["Investigación de materiales", "Control de calidad", "Industria metalúrgica", "Nanotecnología", "Cerámica avanzada"],
    materias: ["Ciencia de materiales", "Metalurgia", "Polímeros", "Cerámicos", "Caracterización"],
    perfil_ideal: ["Curiosidad científica", "Trabajo en laboratorio", "Innovación", "Investigación"],
    duracion: "9 semestres"
  },
  {
    id: "IER",
    nombre: "Ingeniería en Energías Renovables",
    descripcion: "Diseña e implementa sistemas de generación de energía a partir de fuentes renovables como solar, eólica, biomasa e hidráulica.",
    campo_laboral: ["Energía solar", "Energía eólica", "Eficiencia energética", "Auditoría energética", "Proyectos sustentables"],
    materias: ["Energía solar", "Energía eólica", "Termodinámica", "Eficiencia energética", "Gestión ambiental"],
    perfil_ideal: ["Conciencia ambiental", "Interés en sustentabilidad", "Trabajo de campo", "Visión a futuro"],
    duracion: "9 semestres"
  },
  {
    id: "IDS",
    nombre: "Ingeniería en Desarrollo de Software",
    descripcion: "Crea soluciones de software innovadoras aplicando metodologías ágiles, arquitecturas modernas y tecnologías emergentes.",
    campo_laboral: ["Desarrollo full-stack", "Apps móviles", "DevOps", "Arquitectura de software", "Startups tecnológicas"],
    materias: ["Programación avanzada", "Desarrollo web", "Apps móviles", "DevOps", "Arquitectura de software"],
    perfil_ideal: ["Pasión por programar", "Creatividad", "Aprendizaje continuo", "Trabajo ágil"],
    duracion: "9 semestres"
  },
  {
    id: "IIA",
    nombre: "Ingeniería en Inteligencia Artificial",
    descripcion: "Diseña e implementa sistemas inteligentes utilizando machine learning, redes neuronales y procesamiento de lenguaje natural.",
    campo_laboral: ["Machine learning", "Data science", "Visión por computadora", "NLP", "Investigación en IA"],
    materias: ["Machine learning", "Deep learning", "Estadística", "Procesamiento de datos", "Visión por computadora"],
    perfil_ideal: ["Excelencia matemática", "Pensamiento algorítmico", "Curiosidad", "Investigación"],
    duracion: "9 semestres"
  },
  {
    id: "ICV",
    nombre: "Ingeniería Civil",
    descripcion: "Diseña, construye y supervisa proyectos de infraestructura como edificios, puentes, carreteras y sistemas hidráulicos con criterios de seguridad y sustentabilidad.",
    campo_laboral: ["Construcción", "Proyectos estructurales", "Infraestructura urbana", "Supervisión de obras", "Consultoría"],
    materias: ["Mecánica de suelos", "Estructuras", "Hidráulica", "Vías terrestres", "Materiales de construcción"],
    perfil_ideal: ["Razonamiento espacial", "Trabajo en campo", "Responsabilidad", "Liderazgo de equipos"],
    duracion: "9 semestres"
  },
  {
    id: "ILOG",
    nombre: "Ingeniería en Logística",
    descripcion: "Planifica, implementa y controla cadenas de suministro eficientes, optimizando flujos de materiales, información y recursos en organizaciones globales.",
    campo_laboral: ["Cadena de suministro", "Transporte", "Distribución", "Comercio internacional", "Almacenes"],
    materias: ["Logística", "Cadena de suministro", "Transporte", "Inventarios", "Comercio exterior"],
    perfil_ideal: ["Organización", "Visión estratégica", "Negociación", "Pensamiento sistémico"],
    duracion: "9 semestres"
  },
  {
    id: "CP",
    nombre: "Contador Público",
    descripcion: "Registra, analiza e interpreta la información financiera de las organizaciones para la toma de decisiones estratégicas, garantizando el cumplimiento fiscal y legal.",
    campo_laboral: ["Contabilidad general", "Auditoría", "Consultoría fiscal", "Finanzas corporativas", "Nóminas"],
    materias: ["Contabilidad", "Auditoría", "Derecho fiscal", "Costos", "Finanzas"],
    perfil_ideal: ["Honestidad", "Atención al detalle", "Pensamiento analítico", "Disciplina"],
    duracion: "8 semestres"
  },
  {
    id: "IDI",
    nombre: "Ingeniería en Diseño Industrial",
    descripcion: "Crea y desarrolla productos, procesos y servicios innovadores integrando funcionalidad, estética, ergonomía y sustentabilidad para mejorar la calidad de vida.",
    campo_laboral: ["Diseño de productos", "Diseño UX/UI", "Manufactura", "Desarrollo de prototipos", "Diseño sustentable"],
    materias: ["Dibujo industrial", "Ergonomía", "Materiales", "Modelado 3D", "Diseño sustentable"],
    perfil_ideal: ["Creatividad", "Innovación", "Habilidad manual", "Sensibilidad estética"],
    duracion: "9 semestres"
  }
]

export function getCarreraById(id: string): Carrera | undefined {
  return CARRERAS.find(c => c.id === id)
}

export function getCarreraByNombre(nombre: string): Carrera | undefined {
  return CARRERAS.find(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()))
}
