export interface ProfileUser {
  fullName: string;
  profession: string;
  bio: string;
  fotoPerfil?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
    fotoPerfil?: string;
  };
}