import { DEFAULT_USERS } from "@core/api/mock-data";
import { apiClient } from "@core/api/api-client";
import type { User } from "../models/user.model";
import type { 
  SendPasswordResetEmailRequestDTO, 
  SendPasswordResetEmailResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO 
} from "./login.dto";

export const loginService = {
  async login(email: string, pass: string): Promise<User> {

    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;

    const userMatched = users.find((u: { email: string; pass?: string; password?: string }) => 
      u.email === email && (u.pass === pass || u.password === pass)
    );

    if (!userMatched) {
      throw new Error('Credenciales inválidas');
    }

    return {
      id: userMatched.id,
      email: userMatched.email,
      fullName: userMatched.fullName || `${userMatched.first_name} ${userMatched.last_name}`,
      token: userMatched.access_token || 'mock-token'
    };
    
    /* 
    // Implementación real de la API (Comentada temporalmente)
    const data = await apiClient.post<LoginResponseDTO>('/auth/login', { email, pass } as LoginRequestDTO);
    return loginAdapter.toUser(data);
    */
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
