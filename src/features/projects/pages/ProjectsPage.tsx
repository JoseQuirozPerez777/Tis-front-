import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { getProjects, getTechnologies } from "../services/project.service";
import type { ProjectResponseDTO } from "../services/project.dto";
import type { Technology } from "../models/project.model";
import "../styles/projects.css";

export function ProjectsPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [proyectos, setProyectos] = useState<ProjectResponseDTO[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loadingProyectos, setLoadingProyectos] = useState(false);

  const technologyNameById = useMemo(() => {
    return technologies.reduce<Record<number, string>>((acc, technology) => {
      acc[technology.id] = technology.nombre;
      return acc;
    }, {});
  }, [technologies]);

  const cargarProyectos = async () => {
    try {
      setLoadingProyectos(true);
      const [proyectosData, technologiesData] = await Promise.all([
        getProjects(),
        getTechnologies(),
      ]);

      setProyectos(proyectosData);
      setTechnologies(technologiesData);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    } finally {
      setLoadingProyectos(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  if (showForm) {
    return (
      <main className="projects-form-only">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              void cargarProyectos();
            }}
            className="mb-5 bg-card-bg/60 border border-card-border text-text-primary px-5 py-3 rounded-xl hover:border-[#10B981]/50 transition"
          >
            ← Volver a mis proyectos
          </button>

          <ProjectForm />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-100px)] py-8 px-4 max-w-5xl mx-auto">
      <button
        type="button"
        onClick={() => navigate("/profile")}
        className="mb-5 bg-card-bg/60 border border-card-border text-text-primary px-5 py-3 rounded-xl hover:border-[#10B981]/50 transition"
      >
        ← Ir a perfil
      </button>

      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Mis Proyectos
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Proyectos registrados en tu portafolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="bg-[#10B981] hover:opacity-90 text-white px-5 py-3 rounded-xl shadow-lg text-center font-semibold"
          >
            Agregar proyecto
          </button>
        </div>

        {loadingProyectos ? (
          <p className="text-text-secondary">Cargando proyectos...</p>
        ) : proyectos.length === 0 ? (
          <div className="bg-card-bg/50 border border-card-border rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary">
              Aún no tienes proyectos registrados
            </h3>
            <p className="text-text-secondary text-sm mt-2">
              Cuando registres un proyecto, aparecerá aquí como una tarjeta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {proyectos.map((proyecto) => (
              <article
                key={proyecto.idProyecto}
                className="bg-card-bg/50 backdrop-blur-sm border border-card-border rounded-2xl p-5 hover:border-[#10B981]/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  {proyecto.urlsImagenes && proyecto.urlsImagenes.length > 0 && (
                    <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden bg-[#0F223D] shrink-0">
                      <img
                        src={proyecto.urlsImagenes[0]}
                        alt={proyecto.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">
                          {proyecto.titulo}
                        </h3>

                        {proyecto.rolProyecto && (
                          <p className="text-brand-morado font-semibold mt-1">
                            {proyecto.rolProyecto}
                          </p>
                        )}
                      </div>

                      <span className="w-fit px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/10 text-[#10B981]">
                        {proyecto.estadoProyecto || "Registrado"}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm mt-3">
                      {proyecto.descripcion}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {proyecto.tecnologiaIds?.map((id, index) => (
                        <span
                          key={id}
                          className="px-3 py-1 rounded-lg bg-brand-azul-brillante/10 text-brand-azul-brillante text-xs font-semibold"
                        >
                          {proyecto.nombresTecnologias?.[index] ||
                            technologyNameById[id] ||
                            `Tecnología ${id}`}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm">
                      <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                        <p className="text-text-secondary">Privacidad</p>
                        <p className="font-semibold text-text-primary">
                          {proyecto.esPublico ? "Público" : "Privado"}
                        </p>
                      </div>

                      <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                        <p className="text-text-secondary">Inicio</p>
                        <p className="font-semibold text-text-primary">
                          {proyecto.fechaInicio || "Sin fecha"}
                        </p>
                      </div>

                      <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                        <p className="text-text-secondary">Finalización</p>
                        <p className="font-semibold text-text-primary">
                          {proyecto.fechaFinalizacion || "Sin fecha"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {proyecto.enlaceGithub && (
                        <a
                          href={proyecto.enlaceGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-azul-brillante hover:underline font-semibold text-sm"
                        >
                          Repositorio
                        </a>
                      )}

                      {proyecto.enlaceDemo && (
                        <a
                          href={proyecto.enlaceDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-azul-brillante hover:underline font-semibold text-sm"
                        >
                          Demo
                        </a>
                      )}

                      {proyecto.urlsAdicionales?.map((url, index) => (
                        <a
                          key={`${url}-${index}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-azul-brillante hover:underline font-semibold text-sm"
                        >
                          Enlace adicional {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
