import { FiltrosBusquedaCard } from "./FiltrosBusquedaCard";

import type { PortafolioResultado } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaListProps {
  resultados: PortafolioResultado[];
  cargando: boolean;
  error: string | null;
}

export const FiltrosBusquedaList = ({
  resultados,
  cargando,
  error,
}: FiltrosBusquedaListProps) => {
  if (cargando) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-gray-600">
          Buscando portafolios...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-red-700">{error}</p>
      </div>
    );
  }

  if (resultados.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-gray-700">
          No se encontraron portafolios.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Prueba cambiando o limpiando los filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resultados.map((portafolio) => (
        <FiltrosBusquedaCard key={portafolio.id} portafolio={portafolio} />
      ))}
    </div>
  );
};