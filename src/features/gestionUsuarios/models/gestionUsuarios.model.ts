export type RolUsuario = 'Administrador' | 'Usuario';
export type EstadoUsuario = 'Activo' | 'Inactivo';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  profesion: string;
  fechaRegistro: string;
}

export interface FiltrosUsuarios {
  busqueda: string;
  rol: '' | RolUsuario;
  estado: '' | EstadoUsuario;
}