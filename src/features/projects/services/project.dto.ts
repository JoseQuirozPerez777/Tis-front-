export interface TechnologyDTO {
  id: number;
  nombre: string;
  categoria: string;
  logoUrl: string | null;
}

export interface TechnologiesResponseDTO {
  data: TechnologyDTO[];
}

export interface CreateProjectDTO {
  titulo: string;
  descripcion: string;
  tecnologiaIds: number[];

  enlaceGithub?: string;
  enlaceDemo?: string;

  urlsImagenes: string[];

  esPublico: boolean;

  rolProyecto?: string;
  urlsAdicionales?: string[];
  fechaInicio?: string;
  fechaFinalizacion?: string;
  estadoProyecto?: string;
}

export interface ProjectResponseDTO {
  idProyecto: number;
  titulo: string;
  descripcion: string;

  tecnologiaIds: number[];
  nombresTecnologias?: string[];

  enlaceGithub?: string;
  enlaceDemo?: string;
  urlsImagenes?: string[];

  esPublico: boolean;
  idUsuario?: number;

  rolProyecto?: string;
  urlsAdicionales?: string[];
  fechaInicio?: string;
  fechaFinalizacion?: string;
  estadoProyecto?: string;
}
