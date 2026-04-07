import type { Usuario } from '../models/gestionUsuarios.model';
import type { UsuarioDto } from './gestionUsuarios.dto';

export const adaptarUsuario = (usuarioDto: UsuarioDto): Usuario => {
  return {
    id: usuarioDto.id,
    nombre: usuarioDto.nombre,
    correo: usuarioDto.correo,
    rol: usuarioDto.rol,
    estado: usuarioDto.estado,
    profesion: usuarioDto.profesion,
    fechaRegistro: usuarioDto.fecha_registro,
  };
};

export const adaptarUsuarios = (usuariosDto: UsuarioDto[]): Usuario[] => {
  return usuariosDto.map(adaptarUsuario);
};