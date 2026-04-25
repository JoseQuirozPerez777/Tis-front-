export interface Experience {
  id: number;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string | null;
  esTrabajoActual: boolean;
  descripcion: string;
}

export interface ExperienceFormData {
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string;
  esTrabajoActual: boolean;
  descripcion: string;
}

export interface ExperienceErrors {
  empresa?: string;
  cargo?: string;
  fechaInicio?: string;
  fechaFin?: string;
  descripcion?: string;
}

export interface ExperienceMessage {
  type: 'success' | 'error';
  text: string;
}