interface FiltrosBusquedaPaginationProps {
  paginaActual: number;
  totalPaginas: number;
  cargando: boolean;
  onCambiarPagina: (pagina: number) => void;
}

export const FiltrosBusquedaPagination = ({
  paginaActual,
  totalPaginas,
  cargando,
  onCambiarPagina,
}: FiltrosBusquedaPaginationProps) => {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-card-border bg-bg-dark/80 p-4 shadow-sm">
      <button
        type="button"
        disabled={cargando || paginaActual <= 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        Anterior
      </button>

      <span className="text-sm font-medium text-gray-700">
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        disabled={cargando || paginaActual >= totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        Siguiente
      </button>
    </div>
  );
};