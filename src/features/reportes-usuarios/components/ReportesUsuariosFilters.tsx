import type { Dispatch, SetStateAction } from 'react';
import { FileDown, Filter, RotateCcw, Search } from 'lucide-react';
import type { FiltrosReporteUsuario } from '../models/reporte-usuario.model';

interface Props {
  filtros: FiltrosReporteUsuario;
  setFiltros: Dispatch<SetStateAction<FiltrosReporteUsuario>>;
  aplicarFiltros: () => void;
  limpiarFiltros: () => void;
  exportarPdf: () => void;
}

export const ReportesUsuariosFilters = ({
  filtros,
  setFiltros,
  aplicarFiltros,
  limpiarFiltros,
  exportarPdf,
}: Props) => {
  return (
    <div className="rounded-2xl border border-blue-900/70 bg-[#071426] p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-3">
        <Filter className="text-blue-400" size={22} />
        <h2 className="text-xl font-bold text-white">Filtros de búsqueda</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Fecha inicio
          </label>
          <input
            type="date"
            value={filtros.fechaInicio}
            onChange={(event) =>
              setFiltros((prev) => ({
                ...prev,
                fechaInicio: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-blue-900 bg-[#020817] px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Fecha fin
          </label>
          <input
            type="date"
            value={filtros.fechaFin}
            onChange={(event) =>
              setFiltros((prev) => ({
                ...prev,
                fechaFin: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-blue-900 bg-[#020817] px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Estado
          </label>
          <select
            value={filtros.estado}
            onChange={(event) =>
              setFiltros((prev) => ({
                ...prev,
                estado: event.target.value as '' | 'ACTIVO' | 'INACTIVO',
              }))
            }
            className="w-full rounded-lg border border-blue-900 bg-[#020817] px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400"
          >
            <option value="">Todos</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Profesión
          </label>
          <input
            type="text"
            placeholder="Ej: Desarrollador"
            value={filtros.profesion}
            onChange={(event) =>
              setFiltros((prev) => ({
                ...prev,
                profesion: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-blue-900 bg-[#020817] px-4 py-3 text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Nombre o correo
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={filtros.busqueda}
              onChange={(event) =>
                setFiltros((prev) => ({
                  ...prev,
                  busqueda: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-blue-900 bg-[#020817] px-11 py-3 text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-start gap-3 md:justify-end">
          <button
            type="button"
            onClick={aplicarFiltros}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Aplicar filtros
          </button>

          <button
            type="button"
            onClick={limpiarFiltros}
            className="flex items-center gap-2 rounded-lg border border-slate-500 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            <RotateCcw size={18} />
            Limpiar
          </button>

          <button
            type="button"
            onClick={exportarPdf}
            className="flex items-center gap-2 rounded-lg border border-blue-500 px-5 py-3 font-semibold text-blue-400 transition hover:bg-blue-500/10"
          >
            <FileDown size={18} />
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
};