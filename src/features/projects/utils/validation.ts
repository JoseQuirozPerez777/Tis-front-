import type { ProjectFormModel } from "../models/project.model";

export function isValidUrl(value: string): boolean {
  if (!value.trim()) return true;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function validateProjectForm(form: ProjectFormModel): string | null {
  if (!form.nombreProyecto.trim()) {
    return "El nombre del proyecto es obligatorio.";
  }

  if (!form.rolProyecto.trim()) {
    return "El rol en el proyecto es obligatorio.";
  }

  if (!form.descripcionProyecto.trim()) {
    return "La descripción del proyecto es obligatoria.";
  }

  if (form.descripcionProyecto.trim().length < 20) {
    return "La descripción debe tener al menos 20 caracteres.";
  }

  if (form.tecnologiasUsadas.length === 0) {
    return "Debe agregar al menos una tecnología.";
  }

  const tecnologiaIds = form.tecnologiasUsadas
    .map((tech) => Number(tech))
    .filter((id) => !Number.isNaN(id));

  if (tecnologiaIds.length === 0) {
    return "Debe agregar al menos un ID de tecnología válido.";
  }

  if (!isValidUrl(form.urlRepositorio)) {
    return "La URL del repositorio no es válida.";
  }

  if (!isValidUrl(form.urlDemo)) {
    return "La URL de demo no es válida.";
  }

  const invalidAdditionalUrl = form.urlsAdicionales.some(
    (url) => !isValidUrl(url)
  );

  if (invalidAdditionalUrl) {
    return "Una de las URLs adicionales no es válida.";
  }

  return null;
}