export interface ProfessionalLinksData {
  linkedin?: string;
  github?: string;
}

export interface RedSocialResponseDTO {
  idRed: number;
  nombreRed: string;
  urlPerfil: string;
  esPublico: boolean;
}

export interface GetRedesSocialesResponse {
  success: boolean;
  data: RedSocialResponseDTO[];
  message?: string;
}

export interface SaveRedSocialResponse {
  success: boolean;
  message?: string;
  data?: RedSocialResponseDTO | RedSocialResponseDTO[];
}