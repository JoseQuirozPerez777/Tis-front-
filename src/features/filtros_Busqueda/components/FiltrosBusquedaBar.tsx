import type { FormEvent } from "react";

interface FiltrosBusquedaBarProps {
  valor: string;
  cargando: boolean;
  onChange: (valor: string) => void;
  onBuscar: () => void;
}

export const FiltrosBusquedaBar = ({
  valor,
  cargando,
  onChange,
  onBuscar,
}: FiltrosBusquedaBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onBuscar();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex-1">
          <label
            htmlFor="buscar-portafolios"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Buscar portafolio
          </label>

          <input
            id="buscar-portafolios"
            type="text"
            value={valor}
            maxLength={80}
            placeholder="Ej: Gabriel, React, Desarrollador Frontend"
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            Puedes buscar por nombre, profesión, tecnología o palabra clave.
          </p>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
};