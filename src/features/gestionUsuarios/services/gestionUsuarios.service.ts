import { adaptarUsuarios } from './gestionUsuarios.adapter';
import type { UsuarioDto } from './gestionUsuarios.dto';
import type { Usuario } from '../models/gestionUsuarios.model';

const usuariosMock: UsuarioDto[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    correo: 'juan@email.com',
    rol: 'Usuario',
    estado: 'Activo',
    profesion: 'Ingeniero de Software',
    fecha_registro: '10/04/2026',
  },
  {
    id: 2,
    nombre: 'María Gómez',
    correo: 'maria@email.com',
    rol: 'Administrador',
    estado: 'Activo',
    profesion: 'Diseñadora UX/UI',
    fecha_registro: '08/04/2026',
  },
  {
    id: 3,
    nombre: 'Carlos Ruiz',
    correo: 'carlos@email.com',
    rol: 'Usuario',
    estado: 'Inactivo',
    profesion: 'Backend Developer',
    fecha_registro: '05/04/2026',
  },
  {
    id: 4,
    nombre: 'Ana López',
    correo: 'ana@email.com',
    rol: 'Usuario',
    estado: 'Activo',
    profesion: 'Frontend Developer',
    fecha_registro: '03/04/2026',
  },
];

let usuariosEnMemoria: UsuarioDto[] = [...usuariosMock];

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(adaptarUsuarios(usuariosEnMemoria));
    }, 400);
  });
};

export const cambiarEstadoUsuario = async (
  idUsuario: number,
  nuevoEstado: 'Activo' | 'Inactivo'
): Promise<Usuario[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existe = usuariosEnMemoria.some((usuario) => usuario.id === idUsuario);

      if (!existe) {
        reject(new Error('Usuario no encontrado'));
        return;
      }

      usuariosEnMemoria = usuariosEnMemoria.map((usuario) =>
        usuario.id === idUsuario
          ? { ...usuario, estado: nuevoEstado }
          : usuario
      );

      resolve(adaptarUsuarios(usuariosEnMemoria));
    }, 500);
  });
};