import type { ProfileResponse } from '../models/profile.model';
import type { ProfileRequestDto } from './profile.dto';

export interface ProfesionesResponseDto {
  idProfesion: number;
  nombreProfesion: string;
}

export const profileService = {
  getProfile: (): ProfileRequestDto | null => {
    const profileJson = localStorage.getItem('profile');
    return profileJson ? JSON.parse(profileJson) : null;
  },

  getProfesiones: async (): Promise<ProfesionesResponseDto[]> => {
    const response = await fetch('http://localhost:8081/api/profesiones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de profesiones');
    }

    return await response.json();
  },

  // Método actualizado para hacer POST al backend
  updateProfile: async (dto: ProfileRequestDto): Promise<ProfileResponse> => {
    console.log(dto)
     //LÓGICA DE TOKEN (Comentada por ahora):
       const token = sessionStorage.getItem('jwt'); 
    const response = await fetch('http://localhost:8081/api/usuarios/perfil', { // Ajusta esta URL a tu endpoint de Spring Boot
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Si tuvieras el token, se agregaría así:
           'Authorization': `Bearer ${token}` 
        
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      // Manejo de errores si el servidor responde con 4xx o 5xx
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar el perfil en el servidor');
    }
    localStorage.setItem('profile', JSON.stringify(dto));
    // Retornamos la respuesta del backend (ProfileResponse)
    return await response.json();
  },
};