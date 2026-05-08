export interface ProfileUser {
  fullName: string;
  profession: string;
  bio: string;
  telefono: string;
  direccion: string;
  fotoPerfil?: string;
  correo?: string;
}

export interface PerfilBackendResponse {
  nombre: string;
  biografia: string | null;
  idProfesion: number | null;
  foto: string | null;
  telefono: string | null;
  direccion: string | null;
  correo: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
    telefono: string;
    direccion: string;
  };
}

export interface Profesion {
  idProfesion: number;
  nombreProfesion: string;
}