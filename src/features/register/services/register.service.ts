import type { RegisterResponse } from '../models/register.model';
import type { RegisterRequestDto } from './register.dto';

export const registerService = {
  register: async (dto: RegisterRequestDto): Promise<RegisterResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const usersJson = localStorage.getItem('users');
    const users = JSON.parse(usersJson || '[]');
    
    if (users.some((u: { email: string }) => u.email === dto.email)) {
      return {
        success: false,
        message: 'El correo electrónico ya está registrado.'
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      ...dto,
      fullName: dto.fullName,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return {
      success: true,
      message: '¡Registro completado con éxito!',
      data: {
        id: newUser.id,
        email: newUser.email
      }
    };
  }
};
