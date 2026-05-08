// Habilidad Blanda - Request
export interface CreateSoftSkillRequest {
  nombre: string;
  evidenciaUrl?: string;
  idCategoria: number;
}

export interface UpdateSoftSkillRequest extends CreateSoftSkillRequest {
  id: number;
}

// Habilidad Blanda - Response
export interface SoftSkillResponse {
  id: number;
  nombre: string;
  evidenciaUrl: string;
  categoria: {
    idCategoria: number;
    nombre: string;
    clasificacion: string;
  };
}

export interface SoftSkillRegistrationResponse {
  message: string;
  id: number;
}
