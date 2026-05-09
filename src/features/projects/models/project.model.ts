export type ProjectStatus = "FINALIZADO" | "EN_DESARROLLO" | "PAUSADO";

export type ProjectPrivacy = "PUBLICO" | "PRIVADO";

export interface ProjectImage {
  url: string;
  descripcion?: string;
  file?: File;
}

export interface ProjectFormModel {
  nombreProyecto: string;
  rolProyecto: string;
  descripcionProyecto: string;
  tecnologiasUsadas: string[];

  urlRepositorio: string;
  urlDemo: string;
  urlsAdicionales: string[];

  imagenes: ProjectImage[];

  fechaInicio: string;
  fechaFinalizacion: string;
  estadoProyecto: ProjectStatus;
  privacidad: ProjectPrivacy;
}