export interface PerfilPhotoData {
  nombre?: string;
  fotoPerfil?: string;
}

export interface PhotoProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fotoPerfil?: string;
  };
}