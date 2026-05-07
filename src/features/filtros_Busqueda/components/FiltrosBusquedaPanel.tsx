import {
  opcionesDisponibilidad,
  opcionesIdiomas,
  opcionesModalidadTrabajo,
} from "../models/filtros-busqueda.model";

import type { FiltrosBusqueda } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaPanelProps {
  filtros: FiltrosBusqueda;
  cargando: boolean;
  onActualizarFiltro: (
    campo: keyof FiltrosBusqueda,
    valor: string | number | string[],
  ) => void;
  onAlternarIdioma: (idioma: string) => void;
  onAplicarFiltros: () => void;
  onLimpiarFiltros: () => void;
}

export const FiltrosBusquedaPanel = ({
  filtros,
  cargando,
  onActualizarFiltro,
  onAlternarIdioma,
  onAplicarFiltros,
  onLimpiarFiltros,
}: FiltrosBusquedaPanelProps) => {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">Filtros avanzados</h2>
        <p className="text-sm text-gray-500">
          Refina la búsqueda de portafolios profesionales.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Profesión
          </label>
          <input
            type="text"
            value={filtros.profesion}
            maxLength={60}
            placeholder="Ej: Desarrollador de Software"
            onChange={(event) =>
              onActualizarFiltro("profesion", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Solo letras y espacios.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Especialización
          </label>
          <input
            type="text"
            value={filtros.especializacion}
            maxLength={60}
            placeholder="Ej: Frontend, Desarrollo móvil"
            onChange={(event) =>
              onActualizarFiltro("especializacion", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            No permite números ni caracteres especiales.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tecnología
          </label>
          <input
            type="text"
            value={filtros.tecnologia}
            maxLength={50}
            placeholder="Ej: React, Angular, C#, Node.js"
            onChange={(event) =>
              onActualizarFiltro("tecnologia", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Permite letras, números, punto, guion, +, # y /.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Formación académica
          </label>
          <input
            type="text"
            value={filtros.formacionAcademica}
            maxLength={80}
            placeholder="Ej: Ingeniería de Sistemas"
            onChange={(event) =>
              onActualizarFiltro("formacionAcademica", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Solo letras y espacios.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <input
            type="text"
            value={filtros.ubicacion}
            maxLength={80}
            placeholder="Ej: Cochabamba, Bolivia"
            onChange={(event) =>
              onActualizarFiltro("ubicacion", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Permite letras, coma, punto y guion.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Disponibilidad
          </label>
          <select
            value={filtros.disponibilidad}
            onChange={(event) =>
              onActualizarFiltro("disponibilidad", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {opcionesDisponibilidad.map((opcion) => (
              <option key={opcion || "todas"} value={opcion}>
                {opcion || "Todas"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Modalidad de trabajo
          </label>
          <select
            value={filtros.modalidadTrabajo}
            onChange={(event) =>
              onActualizarFiltro("modalidadTrabajo", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {opcionesModalidadTrabajo.map((opcion) => (
              <option key={opcion || "todas"} value={opcion}>
                {opcion || "Todas"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Experiencia mínima
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={filtros.experienciaMinima}
            maxLength={2}
            placeholder="Ej: 5"
            onChange={(event) =>
              onActualizarFiltro("experienciaMinima", event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Solo números entre 0 y 50.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Idiomas
          </label>

          <div className="grid grid-cols-2 gap-2">
            {opcionesIdiomas.map((idioma) => (
              <label
                key={idioma}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={filtros.idiomas.includes(idioma)}
                  onChange={() => onAlternarIdioma(idioma)}
                  className="h-4 w-4"
                />
                {idioma}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={cargando}
          onClick={onAplicarFiltros}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {cargando ? "Aplicando..." : "Aplicar filtros"}
        </button>

        <button
          type="button"
          disabled={cargando}
          onClick={onLimpiarFiltros}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          Limpiar filtros
        </button>
      </div>
    </aside>
  );
};