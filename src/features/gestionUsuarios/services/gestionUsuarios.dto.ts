export interface UsuarioDto {
  id: number;
  nombre: string;
  correo: string;
  rol: 'Administrador' | 'Usuario';
  estado: 'Activo' | 'Inactivo';
  profesion: string;
  fecha_registro: string;
}