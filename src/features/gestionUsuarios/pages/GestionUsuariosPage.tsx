import FiltroUsuarios from '../components/FiltroUsuarios';
import MensajeEstadoUsuario from '../components/MensajeEstadoUsuario';
import ModalConfirmacionEstado from '../components/ModalConfirmacionEstado';
import ModalDetalleUsuario from '../components/ModalDetalleUsuario';
import TablaUsuarios from '../components/TablaUsuarios';
import { useGestionUsuarios } from '../hooks/useGestionUsuarios';

const GestionUsuariosPage = () => {
  const {
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
  } = useGestionUsuarios();

  return (
    <div className="min-h-screen bg-[#000000] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#0B1F3A] p-6 md:p-8 shadow-2xl">
        <h1 className="mb-6 text-3xl font-bold text-[#E5E7EB]">
          Administración de Usuarios
        </h1>

        <FiltroUsuarios
          busqueda={filtros.busqueda}
          rol={filtros.rol}
          estado={filtros.estado}
          onCambiarBusqueda={(valor) => actualizarFiltro('busqueda', valor)}
          onCambiarRol={(valor) => actualizarFiltro('rol', valor)}
          onCambiarEstado={(valor) => actualizarFiltro('estado', valor)}
        />

        <TablaUsuarios
          usuarios={usuariosFiltrados}
          cargando={cargando}
          onVerDetalle={abrirDetalle}
          onCambiarEstado={abrirConfirmacionEstado}
        />
      </div>

      <ModalDetalleUsuario
        abierto={mostrarDetalle}
        usuario={usuarioSeleccionado}
        onCerrar={cerrarDetalle}
      />

      <ModalConfirmacionEstado
        abierto={mostrarConfirmacion}
        usuario={usuarioSeleccionado}
        onCerrar={cerrarConfirmacionEstado}
        onConfirmar={confirmarCambioEstado}
      />

      {mensajeEstado && (
        <MensajeEstadoUsuario
          tipo={mensajeEstado.tipo}
          texto={mensajeEstado.texto}
          onCerrar={cerrarMensajeEstado}
        />
      )}
    </div>
  );
};

export default GestionUsuariosPage;