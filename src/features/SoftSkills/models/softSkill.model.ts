export interface SoftSkill {
  id?: string;
  name: string;
  description?: string;
  certificateTest?: File | null;
}


export interface SoftSkillDto {
  id?: string;
  name: string;
  description: string;
  certificateTest?: File | null;
}

export interface SoftSkillRequestDto {
  nombre: string;
  idCategoria: number;
  descripcion: string;
  certificadoUrl?: string;
}

export interface CategoriaDto {
  idCategoria: number;
  nombre: string;
  clasificacion: string;
}
