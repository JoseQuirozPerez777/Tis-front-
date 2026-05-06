export interface HardSkill {
  id?: string;
  name: string;
  masteryLevel: string;
  categoryId: number;
  yearsOfExperience: number;
  description: string;
  certificateTest?: File | null;
}

export interface HardSkillRequestDto {
  nombre: string;
  idCategoria: number;
  nivelDominio: string;
  anosExperiencia: number;
  descripcion: string;
  certificadoUrl?: string;
}

export interface CategoriaDto {
  idCategoria: number;
  nombre: string;
  clasificacion: string;
}
