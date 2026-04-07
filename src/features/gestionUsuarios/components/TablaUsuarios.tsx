import type { Usuario } from '../models/gestionUsuarios.model';

interface TablaUsuariosProps {
  usuarios: Usuario[];
  cargando: boolean;
  onVerDetalle: (usuario: Usuario) => void;
  onCambiarEstado: (usuario: Usuario) => void;
}

const TablaUsuarios = ({
  usuarios,
  cargando,
  onVerDetalle,
  onCambiarEstado,
}: TablaUsuariosProps) => {
  if (cargando) {
    return (
      <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 text-center text-[#9CA3AF] shadow-md backdrop-blur-sm">
        Cargando usuarios...
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 text-center text-[#9CA3AF] shadow-md backdrop-blur-sm">
        No se encontraron usuarios.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E3A5F] bg-[#142A4A] shadow-xl backdrop-blur-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-[#1E3A5F] bg-[#0F223D] text-left text-[#E5E7EB]">
            <th className="px-6 py-4 font-semibold">Nombre</th>
            <th className="px-6 py-4 font-semibold">Correo</th>
            <th className="px-6 py-4 font-semibold">Rol</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
            <th className="px-6 py-4 font-semibold">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr
              key={usuario.id}
              className="border-b border-[#1E3A5F] transition hover:bg-[#1A3355] last:border-b-0"
            >
              <td className="px-6 py-4 font-medium text-[#E5E7EB]">
                {usuario.nombre}
              </td>
              <td className="px-6 py-4 text-[#9CA3AF]">
                {usuario.correo}
              </td>
              <td className="px-6 py-4 text-[#E5E7EB]">
                {usuario.rol}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    usuario.estado === 'Activo'
                      ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                      : 'border border-slate-400/20 bg-slate-500/15 text-slate-300'
                  }`}
                >
                  {usuario.estado}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onVerDetalle(usuario)}
                    className="rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:opacity-90"
                  >
                    Ver detalle
                  </button>

                  <button
                    onClick={() => onCambiarEstado(usuario)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg ${
                      usuario.estado === 'Activo'
                        ? 'bg-rose-600 hover:bg-rose-500'
                        : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    {usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;