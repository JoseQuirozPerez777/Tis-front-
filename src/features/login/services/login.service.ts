import type { User } from "../models/user.model";

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
};