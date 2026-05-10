import { useState } from "react";
import type { ProjectFormModel } from "../models/project.model";
import { projectService } from "../services/project.service";
import { validateProjectForm } from "../utils/validation";

const initialForm: ProjectFormModel = {
  nombreProyecto: "",
  rolProyecto: "Full Stack Developer",
  descripcionProyecto: "",
  tecnologiasUsadas: [],

  urlRepositorio: "",
  urlDemo: "",
  urlsAdicionales: [""],

  imagenes: [],

  fechaInicio: "",
  fechaFinalizacion: "",
  estadoProyecto: "FINALIZADO",
  privacidad: "PUBLICO",
};

export function useProjects() {
  const [form, setForm] = useState<ProjectFormModel>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  function addTechnology() {
    const value = prompt("Ingrese el ID de la tecnología:");
    if (!value?.trim()) return;

    setForm((prev) => ({
      ...prev,
      tecnologiasUsadas: [...prev.tecnologiasUsadas, value.trim()],
    }));
  }

  function removeTechnology(value: string) {
    setForm((prev) => ({
      ...prev,
      tecnologiasUsadas: prev.tecnologiasUsadas.filter((item) => item !== value),
    }));
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
      urlsAdicionales: prev.urlsAdicionales.filter((_, i) => i !== index),
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
      imagenes: [newImage],
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

    const tecnologiaIds = form.tecnologiasUsadas
      .map((tech) => Number(tech))
      .filter((id) => !Number.isNaN(id));

    if (tecnologiaIds.length === 0) {
      setMessage("Debe agregar al menos un ID de tecnología válido.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Subiendo imagen a Cloudinary...");

      const urlsImagenes = await Promise.all(
        form.imagenes.map(async (imagen) => {
          if (imagen.file) {
            return projectService.uploadToCloudinary(imagen.file);
          }

          return imagen.url;
        })
      );

      setMessage("Guardando proyecto...");

      await projectService.createProject({
        titulo: form.nombreProyecto,
        descripcion: form.descripcionProyecto,
        tecnologiaIds,
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
      });

      setMessage("Proyecto registrado correctamente.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo registrar el proyecto.";

      setMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    message,
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