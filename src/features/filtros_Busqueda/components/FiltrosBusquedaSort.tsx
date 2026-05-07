import {
  opcionesOrdenarPor,
  type OrdenarPor,
} from "../models/filtros-busqueda.model";

interface FiltrosBusquedaSortProps {
  valor: OrdenarPor;
  total: number;
  onCambiarOrden: (ordenarPor: OrdenarPor) => void;
}

export const FiltrosBusquedaSort = ({
  valor,
  total,
  onCambiarOrden,
}: FiltrosBusquedaSortProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {total} portafolio{total === 1 ? "" : "s"} encontrado
          {total === 1 ? "" : "s"}
        </p>
        <p className="text-xs text-gray-500">
          Ordena los resultados según tu necesidad.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="ordenar-portafolios"
          className="text-sm font-medium text-gray-700"
        >
          Ordenar por:
        </label>

        <select
          id="ordenar-portafolios"
          value={valor}
          onChange={(event) => onCambiarOrden(event.target.value as OrdenarPor)}
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {opcionesOrdenarPor.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};