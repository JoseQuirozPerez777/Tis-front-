import type { Usuario } from '../models/gestionUsuarios.model';

interface ModalDetalleUsuarioProps {
  abierto: boolean;
  usuario: Usuario | null;
  onCerrar: () => void;
}

const ModalDetalleUsuario = ({
  abierto,
  usuario,
  onCerrar,
}: ModalDetalleUsuarioProps) => {
  if (!abierto || !usuario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#1E3A5F] bg-[#142A4A] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1E3A5F] bg-[#0F223D] px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-[#E5E7EB]">
            Detalle de Usuario
          </h2>
          <button
            onClick={onCerrar}
            className="text-2xl text-[#9CA3AF] transition hover:text-[#E5E7EB]"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 px-6 py-5 text-[#9CA3AF]">
          <div>
            <span className="font-semibold text-[#E5E7EB]">Nombre:</span>{' '}
            {usuario.nombre}
          </div>
          <div>
            <span className="font-semibold text-[#E5E7EB]">Correo:</span>{' '}
            {usuario.correo}
          </div>
          <div>
            <span className="font-semibold text-[#E5E7EB]">Rol:</span>{' '}
            {usuario.rol}
          </div>
          <div>
            <span className="font-semibold text-[#E5E7EB]">Estado:</span>{' '}
            {usuario.estado}
          </div>
          <div>
            <span className="font-semibold text-[#E5E7EB]">Profesión:</span>{' '}
            {usuario.profesion}
          </div>
          <div>
            <span className="font-semibold text-[#E5E7EB]">Fecha de registro:</span>{' '}
            {usuario.fechaRegistro}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#1E3A5F] px-6 py-4">
          <button
            onClick={onCerrar}
            className="rounded-xl bg-[#3B82F6] px-4 py-2 font-medium text-white transition hover:bg-[#60A5FA]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleUsuario;