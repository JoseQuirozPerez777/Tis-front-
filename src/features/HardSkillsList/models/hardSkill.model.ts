// Habilidad Técnica - Request
export interface CreateHardSkillRequest {
  nombre: string;
  nivelDominio: 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | 'EXPERTO';
  anosExperiencia?: number;
  descripcion?: string;
  certificadoUrl?: string;
  idCategoria: number;
}

export interface UpdateHardSkillRequest extends CreateHardSkillRequest {
  id: number;
}

// Habilidad Técnica - Response
export interface HardSkillResponse {
  id: number;
  nombre: string;
  nivelDominio: 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | 'EXPERTO';
  anosExperiencia: number;
  descripcion: string;
  certificadoUrl: string;
  categoria: {
    idCategoria: number;
    nombre: string;
    clasificacion: string;
  };
}

export interface HardSkillRegistrationResponse {
  message: string;
  id: number;
}
