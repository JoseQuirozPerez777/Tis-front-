import { DEFAULT_USERS } from "@core/api/mock-data";
import type { User } from "../models/user.model";

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
};
