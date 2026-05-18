import { useEffect, useState } from "react";
import type {
  ProjectFormModel,
  ProjectStatus,
  Technology,
} from "../models/project.model";
import type { ProjectResponseDTO } from "../services/project.dto";
import { projectService } from "../services/project.service";
import { validateProjectForm } from "../utils/validation";

const initialForm: ProjectFormModel = {
  nombreProyecto: "",
  rolProyecto: "Full Stack Developer",
  descripcionProyecto: "",

  tecnologiasIds: [],
  tecnologiasHerramientas: [],

  urlRepositorio: "",
  urlDemo: "",
  urlsAdicionales: [""],

  imagenes: [],

  fechaInicio: "",
  fechaFinalizacion: "",
  estadoProyecto: "FINALIZADO",
  privacidad: "PUBLICO",
};

interface UseProjectsOptions {
  projectToEdit?: ProjectResponseDTO | null;
  onSaved?: () => void;
}

function mapProjectToForm(
  project: ProjectResponseDTO,
  technologies: Technology[]
): ProjectFormModel {
  return {
    nombreProyecto: project.titulo || "",
    rolProyecto: project.rolProyecto || "Full Stack Developer",
    descripcionProyecto: project.descripcion || "",

    tecnologiasIds: project.tecnologiaIds || [],
    tecnologiasHerramientas:
      project.nombresTecnologias ||
      project.tecnologiaIds?.map((id) => {
        return (
          technologies.find((technology) => technology.id === id)?.nombre ||
          `Tecnología ${id}`
        );
      }) ||
      [],

    urlRepositorio: project.enlaceGithub || "",
    urlDemo: project.enlaceDemo || "",
    urlsAdicionales:
      project.urlsAdicionales && project.urlsAdicionales.length > 0
        ? project.urlsAdicionales
        : [""],

    imagenes:
      project.urlsImagenes?.map((url) => ({
        url,
        descripcion: "Imagen del proyecto",
      })) || [],

    fechaInicio: project.fechaInicio || "",
    fechaFinalizacion: project.fechaFinalizacion || "",
    estadoProyecto: (project.estadoProyecto as ProjectStatus) || "FINALIZADO",
    privacidad: project.esPublico ? "PUBLICO" : "PRIVADO",
  };
}

export function useProjects(options?: UseProjectsOptions) {
  const projectToEdit = options?.projectToEdit || null;
  const isEditMode = Boolean(projectToEdit);

  const [form, setForm] = useState<ProjectFormModel>(initialForm);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loadingTechnologies, setLoadingTechnologies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadTechnologies() {
    try {
      setLoadingTechnologies(true);
      const data = await projectService.getTechnologies();
      setTechnologies(data);
    } catch (error) {
      setTechnologies([]);
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las tecnologías."
      );
    } finally {
      setLoadingTechnologies(false);
    }
  }

  useEffect(() => {
    void loadTechnologies();
  }, []);

  useEffect(() => {
    if (projectToEdit) {
      setForm(mapProjectToForm(projectToEdit, technologies));
    } else {
      setForm(initialForm);
    }
  }, [projectToEdit, technologies]);

  function updateField<K extends keyof ProjectFormModel>(
    field: K,
    value: ProjectFormModel[K]
  ) {
    setForm((prev) => {
      if (field === "estadoProyecto" && value !== "FINALIZADO") {
        return {
          ...prev,
          [field]: value,
          fechaFinalizacion: "",
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  }

  function addTechnology(technologyId: number) {
    const selectedTechnology = technologies.find(
      (technology) => technology.id === technologyId
    );

    if (!selectedTechnology) return;

    setForm((prev) => {
      if (prev.tecnologiasIds.includes(technologyId)) {
        setMessage("Esta tecnología ya fue agregada.");
        return prev;
      }

      return {
        ...prev,
        tecnologiasIds: [...prev.tecnologiasIds, selectedTechnology.id],
        tecnologiasHerramientas: [
          ...prev.tecnologiasHerramientas,
          selectedTechnology.nombre,
        ],
      };
    });
  }

  function removeTechnology(technologyId: number) {
    setForm((prev) => {
      const indexToRemove = prev.tecnologiasIds.findIndex(
        (id) => id === technologyId
      );

      return {
        ...prev,
        tecnologiasIds: prev.tecnologiasIds.filter((id) => id !== technologyId),
        tecnologiasHerramientas: prev.tecnologiasHerramientas.filter(
          (_, index) => index !== indexToRemove
        ),
      };
    });
  }

  function addAdditionalUrl() {
    setForm((prev) => ({
      ...prev,
      urlsAdicionales: [...prev.urlsAdicionales, ""],
    }));
  }

  function updateAdditionalUrl(index: number, value: string) {
    setForm((prev) => {
      const urls = [...prev.urlsAdicionales];
      urls[index] = value;

      return {
        ...prev,
        urlsAdicionales: urls,
      };
    });
  }

  function removeAdditionalUrl(index: number) {
    setForm((prev) => ({
      ...prev,
      urlsAdicionales:
        prev.urlsAdicionales.length === 1
          ? [""]
          : prev.urlsAdicionales.filter((_, i) => i !== index),
    }));
  }

  function addImages(files: FileList | null) {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > 5 * 1024 * 1024) {
      setMessage("La imagen no debe superar los 5MB.");
      return;
    }

    const newImage = {
      url: URL.createObjectURL(file),
      descripcion: file.name,
      file,
    };

    setForm((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, newImage],
    }));
  }

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  }

  async function saveProject() {
    const validationError = validateProjectForm(form);

    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      setLoading(true);
      setMessage("Subiendo imágenes a Cloudinary...");

      const urlsImagenes = await Promise.all(
        form.imagenes.map(async (imagen) => {
          if (imagen.file) {
            return projectService.uploadToCloudinary(imagen.file);
          }

          return imagen.url;
        })
      );

      const payload = {
        titulo: form.nombreProyecto,
        descripcion: form.descripcionProyecto,
        tecnologiaIds: form.tecnologiasIds,
        enlaceGithub: form.urlRepositorio || undefined,
        enlaceDemo: form.urlDemo || undefined,
        urlsImagenes,
        esPublico: form.privacidad === "PUBLICO",

        rolProyecto: form.rolProyecto || undefined,
        urlsAdicionales: form.urlsAdicionales.filter((url) => url.trim() !== ""),
        fechaInicio: form.fechaInicio || undefined,
        fechaFinalizacion:
          form.estadoProyecto === "FINALIZADO"
            ? form.fechaFinalizacion || undefined
            : undefined,
        estadoProyecto: form.estadoProyecto,
      };

      setMessage(isEditMode ? "Actualizando proyecto..." : "Guardando proyecto...");

      if (isEditMode && projectToEdit) {
        await projectService.updateProject(projectToEdit.idProyecto, payload);
        setMessage("Proyecto actualizado correctamente.");
      } else {
        await projectService.createProject(payload);
        setMessage("Proyecto registrado correctamente.");
        setForm(initialForm);
      }

      options?.onSaved?.();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "No se pudo actualizar el proyecto."
            : "No se pudo registrar el proyecto."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    technologies,
    loadingTechnologies,
    loading,
    message,
    isEditMode,
    updateField,
    addTechnology,
    removeTechnology,
    addAdditionalUrl,
    updateAdditionalUrl,
    removeAdditionalUrl,
    addImages,
    removeImage,
    saveProject,
  };
}