import type { Technology } from "../models/project.model";
import type {
  CreateProjectDTO,
  ProjectResponseDTO,
  TechnologiesResponseDTO,
  UpdateProjectDTO,
} from "./project.dto";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

function getToken() {
  return (
    sessionStorage.getItem("jwt") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("token")
  );
}

function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token de sesión. Inicia sesión nuevamente.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const projectService = {
  getTechnologies: async (): Promise<Technology[]> => {
    const response = await fetch(`${API_URL}/api/tecnologias`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = (await response.json().catch(() => null)) as
      | TechnologiesResponseDTO
      | Technology[]
      | null;

    if (!response.ok) {
      throw new Error("No se pudieron obtener las tecnologías.");
    }

    const data = Array.isArray(result) ? result : result?.data || [];

    return data.map((tech) => ({
      id: tech.id,
      nombre: tech.nombre,
      categoria: tech.categoria,
      logoUrl: tech.logoUrl,
    }));
  },

  uploadToCloudinary: async (file: File): Promise<string> => {
    const CLOUD_NAME = "ddzmot3te";
    const UPLOAD_PRESET = "profile_photos_unsigned";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "project_images");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.secure_url) {
      throw new Error(
        data?.error?.message || "Error al subir la imagen a Cloudinary"
      );
    }

    return data.secure_url as string;
  },

  createProject: async (data: CreateProjectDTO) => {
    const response = await fetch(`${API_URL}/api/proyectos/registrar`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al registrar el proyecto");
    }

    return result;
  },

  updateProject: async (idProyecto: number, data: UpdateProjectDTO) => {
    const response = await fetch(`${API_URL}/api/proyectos/${idProyecto}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al actualizar el proyecto");
    }

    return result;
  },

  deleteProject: async (idProyecto: number) => {
    const response = await fetch(`${API_URL}/api/proyectos/${idProyecto}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al eliminar el proyecto");
    }

    return result;
  },

  toggleFeaturedProject: async (idProyecto: number, destacado: boolean) => {
    const response = await fetch(
      `${API_URL}/api/proyectos/${idProyecto}/destacado`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ destacado }),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        result?.message || "No se pudo actualizar el estado destacado."
      );
    }

    return result;
  },

  getProjects: async (): Promise<ProjectResponseDTO[]> => {
    const response = await fetch(`${API_URL}/api/proyectos`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al obtener proyectos");
    }

    return result?.data || [];
  },
};

export const createProject = projectService.createProject;
export const updateProject = projectService.updateProject;
export const deleteProject = projectService.deleteProject;
export const toggleFeaturedProject = projectService.toggleFeaturedProject;
export const getProjects = projectService.getProjects;
export const getTechnologies = projectService.getTechnologies;
export const uploadProjectImage = projectService.uploadToCloudinary;