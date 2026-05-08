export type NivelDominio = 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | 'EXPERTO';
export type SkillType = 'TECNICA' | 'BLANDA';

// Habilidad Técnica
export interface TechnicalSkill {
  id?: number;
  nombre: string;
  idCategoria: number;
  nivelDominio: NivelDominio;
  anosExperiencia: number;
  descripcion?: string;
  certificadoUrl?: string;
}

// Habilidad Blanda
export interface SoftSkill {
  id?: number;
  nombre: string;
  idCategoria: number;
  evidenciaUrl?: string;
}

// Categoría
export interface SkillCategory {
  idCategoria: number;
  nombre: string;
  clasificacion: 'TECNICA' | 'BLANDA';
}

// Response generales
export interface SkillResponse {
  message: string;
  id: number;
}

// Tipo genérico para skills
export type Skill = TechnicalSkill | SoftSkill;