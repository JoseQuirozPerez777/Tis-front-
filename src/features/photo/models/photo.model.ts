export interface PerfilPhotoData {
  fullName: string;
  profession: string;
  bio: string;
  fotoPerfil?: string;
}

export interface PhotoProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
    fotoPerfil?: string;
  };
}