import type { PortafolioResultado } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaCardProps {
  portafolio: PortafolioResultado;
}

export const FiltrosBusquedaCard = ({
  portafolio,
}: FiltrosBusquedaCardProps) => {
  const iniciales = portafolio.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-xl font-bold text-blue-700">
          {portafolio.fotoPerfilUrl ? (
            <img
              src={portafolio.fotoPerfilUrl}
              alt={portafolio.nombreCompleto}
              className="h-full w-full object-cover"
            />
          ) : (
            iniciales
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {portafolio.nombreCompleto}
              </h3>

              <p className="text-sm font-medium text-blue-700">
                {portafolio.profesion}
              </p>

              {portafolio.especializacion && (
                <p className="text-sm text-gray-500">
                  {portafolio.especializacion}
                </p>
              )}
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                portafolio.disponibilidad === "Disponible"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {portafolio.disponibilidad || "Sin estado"}
            </span>
          </div>

          {portafolio.resumen && (
            <p className="mt-3 line-clamp-2 text-sm text-gray-600">
              {portafolio.resumen}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {portafolio.tecnologias.length > 0 ? (
              portafolio.tecnologias.slice(0, 5).map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {tecnologia}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">
                Sin tecnologías registradas
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-2 text-sm text-gray-600 md:grid-cols-4">
            <div>
              <span className="block text-xs text-gray-400">Ubicación</span>
              {portafolio.ubicacion}
            </div>

            <div>
              <span className="block text-xs text-gray-400">Modalidad</span>
              {portafolio.modalidadTrabajo || "No definida"}
            </div>

            <div>
              <span className="block text-xs text-gray-400">Experiencia</span>
              {portafolio.experienciaAnios} años
            </div>

            <div>
              <span className="block text-xs text-gray-400">Proyectos</span>
              {portafolio.cantidadProyectos}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <a
              href={portafolio.urlPublica}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Ver perfil
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};