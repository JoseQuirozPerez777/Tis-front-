export interface ExperienceDto {
  id: number;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string | null;
  descripcion: string;
  esTrabajoActual: boolean;
}

export interface CreateExperienceDto {
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string | null;
  descripcion: string;
  esTrabajoActual: boolean;
}

export interface UpdateExperienceDto {
  id: number;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string | null;
  descripcion: string;
  esTrabajoActual: boolean;
}