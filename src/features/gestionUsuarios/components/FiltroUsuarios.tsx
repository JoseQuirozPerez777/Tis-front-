import type { EstadoUsuario, RolUsuario } from '../models/gestionUsuarios.model';

interface FiltroUsuariosProps {
  busqueda: string;
  rol: '' | RolUsuario;
  estado: '' | EstadoUsuario;
  onCambiarBusqueda: (valor: string) => void;
  onCambiarRol: (valor: string) => void;
  onCambiarEstado: (valor: string) => void;
}

const FiltroUsuarios = ({
  busqueda,
  rol,
  estado,
  onCambiarBusqueda,
  onCambiarRol,
  onCambiarEstado,
}: FiltroUsuariosProps) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <input
        type="text"
        placeholder="Buscar usuario por nombre o correo"
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
        className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
      />

      <select
        value={estado}
        onChange={(e) => onCambiarEstado(e.target.value)}
        className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
      >
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>

      <select
        value={rol}
        onChange={(e) => onCambiarRol(e.target.value)}
        className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
      >
        <option value="">Todos los roles</option>
        <option value="Administrador">Administrador</option>
        <option value="Usuario">Usuario</option>
      </select>
    </div>
  );
};

export default FiltroUsuarios;