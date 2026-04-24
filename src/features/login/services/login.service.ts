//import { DEFAULT_USERS } from "@core/api/mock-data";
import { apiClient } from "@core/api/api-client";
import type { User } from "../models/user.model";
import type { 
  SendPasswordResetEmailRequestDTO, 
  SendPasswordResetEmailResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO 
} from "./login.dto";

// 1. Definimos la interfaz de la respuesta que viene del Back (Java)
interface UsuarioRespuestaDTO {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
    roles: string[];
  };
}

export const loginService = {
  async login(email: string, pass: string): Promise<User> {
    /*
    return new Promise((resolve, reject) => {
      // Simulamos la verificación local para probar sin Backend/BD
      setTimeout(() => {
        if (pass === '123456' || email === 'admin@admin.com') {
          const fakeToken = 'mock-jwt-token-123456789';
          sessionStorage.setItem('jwt', fakeToken);
          
          resolve({
            id: '1',
            email: email,
            fullName: 'Usuario de Prueba (Sin DB)',
            token: fakeToken,
          });
        } else {
          reject(new Error('Credenciales inválidas. Usa la contraseña "123456" para entrar sin BD.'));
        }
      }, 600);
    });
    */

    
    // CÓDIGO ORIGINAL HACIA EL BACKEND

    // 2. Construimos el DTO que espera el Backend (LoginRequestDTO)
    const loginRequest = {
      correo: email,
      password: pass
    };

    const response = await fetch('http://localhost:8081/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    // 3. Manejo de errores (401 Unauthorized, 400 Bad Request, etc.)
    if (!response.ok) {
      // El backend devuelve el mensaje de error en el cuerpo de la respuesta
      const errorMsg = await response.text(); 
      throw new Error(errorMsg || 'Credenciales inválidas');
    }

    // 4. Parseamos la respuesta exitosa
    const data = (await response.json()) as UsuarioRespuestaDTO;

    // 5. Guardamos el token en sessionStorage (como hicimos en el registro)
    if (data.token) {
      sessionStorage.setItem('jwt', data.token);
    }

    // 6. Mapeamos al modelo 'User' que espera tu Frontend
    return {
      id: data.usuario.id.toString(),
      email: data.usuario.correo,
      fullName: data.usuario.nombre,
      token: data.token // Retornamos el token real del JWT
    };
    
  },

  async sendPasswordResetEmail(correo: string): Promise<SendPasswordResetEmailResponseDTO> {
    const payload: SendPasswordResetEmailRequestDTO = { correo };
    const response = await apiClient.post<SendPasswordResetEmailResponseDTO>(
      '/api/password/email',
      payload
    );
    return response;
  },

  async resetPassword(token: string, password: string): Promise<ResetPasswordResponseDTO> {
    const payload: ResetPasswordRequestDTO = { password };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await apiClient.post<ResetPasswordResponseDTO>(
      '/api/password/reset-password',
      payload,
      config
    );
    return response;
  }
};
