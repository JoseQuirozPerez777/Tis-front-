import { useState } from 'react';
import type { PortafolioResultado } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaCardProps {
  portafolio: PortafolioResultado;
}

export const FiltrosBusquedaCard = ({
  portafolio,
}: FiltrosBusquedaCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const fullUrl = `${window.location.origin}${portafolio.urlPublica}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const iniciales = portafolio.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");

  return (
    <article className="rounded-2xl border border-card-border bg-[#0B1F3A]/50 backdrop-blur-sm p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition hover:border-brand-azul-brillante/50">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-azul-medio/80 text-xl font-bold text-[#E2F0FF] border border-card-border">
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
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#E2F0FF]">
                {portafolio.nombreCompleto}
              </h3>

              <p className="text-sm font-medium text-brand-azul-neon">
                {portafolio.profesion}
              </p>

              {portafolio.especializacion && (
                <p className="text-sm text-text-secondary">
                  {portafolio.especializacion}
                </p>
              )}
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                portafolio.disponibilidad === "Disponible"
                  ? "bg-[#0f342b] text-[#34d399]"
                  : "bg-brand-azul-medio/60 text-text-secondary"
              }`}
            >
              {portafolio.disponibilidad || "Sin estado"}
            </span>
          </div>

          {portafolio.resumen && (
            <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
              {portafolio.resumen}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {portafolio.tecnologias.length > 0 ? (
              portafolio.tecnologias.slice(0, 5).map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full bg-brand-azul-medio/50 px-3 py-1 text-xs font-medium text-brand-celeste-suave border border-card-border/30"
                >
                  {tecnologia}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-muted">
                Sin tecnologías registradas
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-2 text-sm text-text-secondary md:grid-cols-4 border-t border-card-border/40 pt-3">
            <div>
              <span className="block text-xs text-text-muted">Ubicación</span>
              {portafolio.ubicacion}
            </div>

            <div>
              <span className="block text-xs text-text-muted">Modalidad</span>
              {portafolio.modalidadTrabajo || "No definida"}
            </div>

            <div>
              <span className="block text-xs text-text-muted">Experiencia</span>
              {portafolio.experienciaAnios} años
            </div>

            <div>
              <span className="block text-xs text-text-muted">Proyectos</span>
              {portafolio.cantidadProyectos}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3 items-center">
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition cursor-pointer select-none ${
                copied
                  ? 'bg-[#0f342b] border-[#25c48c]/30 text-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.15)]'
                  : 'bg-brand-azul-medio/30 border-card-border text-text-secondary hover:border-brand-azul-brillante/50 hover:text-white hover:bg-brand-azul-medio/50'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2h2a2 2 0 002-2M8 5a2 2 0 00-2 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Compartir</span>
                </>
              )}
            </button>
            <a
              href={portafolio.urlPublica}
              className="rounded-xl bg-brand-azul-brillante px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-azul-neon shadow-sm hover:shadow-[0_0_12px_rgba(47,128,237,0.3)]"
            >
              Ver perfil
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};