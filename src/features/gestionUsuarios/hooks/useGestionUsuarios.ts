import { useEffect, useMemo, useState } from 'react';
import type { EstadoUsuario, FiltrosUsuarios, Usuario } from '../models/gestionUsuarios.model';
import { cambiarEstadoUsuario, obtenerUsuarios } from '../services';

interface MensajeEstado {
  tipo: 'success' | 'error';
  texto: string;
}

export const useGestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const [filtros, setFiltros] = useState<FiltrosUsuarios>({
    busqueda: '',
    rol: '',
    estado: '',
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState<boolean>(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState<boolean>(false);

  const [mensajeEstado, setMensajeEstado] = useState<MensajeEstado | null>(null);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      setMensajeEstado({
        tipo: 'error',
        texto: 'No se pudieron cargar los usuarios.',
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarUsuarios();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const coincideBusqueda =
        usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(filtros.busqueda.toLowerCase());

      const coincideRol = filtros.rol ? usuario.rol === filtros.rol : true;
      const coincideEstado = filtros.estado ? usuario.estado === filtros.estado : true;

      return coincideBusqueda && coincideRol && coincideEstado;
    });
  }, [usuarios, filtros]);

  const actualizarFiltro = (campo: keyof FiltrosUsuarios, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const abrirDetalle = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarDetalle(true);
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
    setUsuarioSeleccionado(null);
  };

  const abrirConfirmacionEstado = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarConfirmacion(true);
  };

  const cerrarConfirmacionEstado = () => {
    setMostrarConfirmacion(false);
    setUsuarioSeleccionado(null);
  };

  const confirmarCambioEstado = async () => {
    if (!usuarioSeleccionado) return;

    try {
      const nuevoEstado: EstadoUsuario =
        usuarioSeleccionado.estado === 'Activo' ? 'Inactivo' : 'Activo';

      const usuariosActualizados = await cambiarEstadoUsuario(
        usuarioSeleccionado.id,
        nuevoEstado
      );

      setUsuarios(usuariosActualizados);
      setMensajeEstado({
        tipo: 'success',
        texto:
          nuevoEstado === 'Inactivo'
            ? 'Usuario desactivado correctamente.'
            : 'Usuario activado correctamente.',
      });

      cerrarConfirmacionEstado();
    } catch (error) {
      setMensajeEstado({
        tipo: 'error',
        texto: 'No se pudo actualizar el estado del usuario.',
      });
    }
  };

  const cerrarMensajeEstado = () => {
    setMensajeEstado(null);
  };

  return {
    usuarios,
    usuariosFiltrados,
    cargando,
    filtros,
    usuarioSeleccionado,
    mostrarDetalle,
    mostrarConfirmacion,
    mensajeEstado,
    actualizarFiltro,
    abrirDetalle,
    cerrarDetalle,
    abrirConfirmacionEstado,
    cerrarConfirmacionEstado,
    confirmarCambioEstado,
    cerrarMensajeEstado,
  };
};