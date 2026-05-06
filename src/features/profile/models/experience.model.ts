export interface Experience {
  id: number;
  empresa: string;
  cargo: string;

  areaProfesional: string;
  especializacion: string;

  fechaInicio: string;
  fechaFin: string | null;
  esTrabajoActual: boolean;

  modalidadTrabajo: string;
  ubicacion: string;
  tipoContrato: string;

  tecnologiasHerramientas: string[];

  descripcion: string;

  evidenciaLaboralPdfUrl: string | null;
  proyectoRelacionadoUrl: string | null;

  experienciaCalculada?: string;
}

export interface ExperienceFormData {
  empresa: string;
  cargo: string;

  areaProfesional: string;
  especializacion: string;

  fechaInicio: string;
  fechaFin: string;
  esTrabajoActual: boolean;

  modalidadTrabajo: string;
  ubicacion: string;
  tipoContrato: string;

  tecnologiasHerramientas: string[];

  descripcion: string;

  evidenciaLaboralPdfUrl: string;
  proyectoRelacionadoUrl: string;
}

export interface ExperienceErrors {
  empresa?: string;
  cargo?: string;

  areaProfesional?: string;
  especializacion?: string;

  fechaInicio?: string;
  fechaFin?: string;

  modalidadTrabajo?: string;
  ubicacion?: string;
  tipoContrato?: string;

  tecnologiasHerramientas?: string;

  descripcion?: string;

  evidenciaLaboralPdfUrl?: string;
  proyectoRelacionadoUrl?: string;
}

export interface ExperienceMessage {
  type: 'success' | 'error';
  text: string;
}