import type { Usuario } from '../models/gestionUsuarios.model';

interface ModalConfirmacionEstadoProps {
  abierto: boolean;
  usuario: Usuario | null;
  onCerrar: () => void;
  onConfirmar: () => void;
}

const ModalConfirmacionEstado = ({
  abierto,
  usuario,
  onCerrar,
  onConfirmar,
}: ModalConfirmacionEstadoProps) => {
  if (!abierto || !usuario) return null;

  const estaActivo = usuario.estado === 'Activo';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#1E3A5F] bg-[#142A4A] shadow-2xl">
        <div className="flex items-center justify-between rounded-t-2xl border-b border-[#1E3A5F] bg-[#0F223D] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#E5E7EB]">
            {estaActivo ? 'Desactivar Usuario' : 'Activar Usuario'}
          </h2>
          <button
            onClick={onCerrar}
            className="text-2xl text-[#9CA3AF] transition hover:text-[#E5E7EB]"
          >
            ×
          </button>
        </div>

        <div className="space-y-3 px-6 py-5 text-[#9CA3AF]">
          <p>
            ¿Estás seguro de que deseas{' '}
            <span className="font-semibold text-[#E5E7EB]">
              {estaActivo ? 'desactivar' : 'activar'}
            </span>{' '}
            a <span className="font-semibold text-[#E5E7EB]">{usuario.nombre}</span>?
          </p>

          <p className="text-sm text-[#9CA3AF]">
            {estaActivo
              ? 'El usuario no podrá iniciar sesión en el sistema.'
              : 'El usuario podrá acceder nuevamente al sistema.'}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#1E3A5F] px-6 py-4">
          <button
            onClick={onCerrar}
            className="rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-2 font-medium text-[#E5E7EB] transition hover:bg-[#163052]"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirmar}
            className={`rounded-xl px-4 py-2 font-medium text-white transition ${
              estaActivo
                ? 'bg-rose-600 hover:bg-rose-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {estaActivo ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionEstado;