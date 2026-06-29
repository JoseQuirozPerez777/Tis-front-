import type {
  Disponibilidad,
  ModalidadTrabajo,
  OrdenarPor,
  ExperienciaLaboral,
  HabilidadTecnica,
  HabilidadBlanda,
  Proyecto,
  FormacionAcademica,
} from "../models/filtros-busqueda.model";

export interface BuscarPortafoliosRequestDTO {
  buscar?: string | null;
  profesion?: string | null;
  especializacion?: string | null;
  tecnologia?: string | null;
  empresa?: string | null;
  //formacionAcademica?: string | null;
  disponibilidad?: Disponibilidad | null;
  modalidadTrabajo?: "REMOTO" | "PRESENCIAL" | "HIBRIDO" | null;
  experienciaMinima?: number | null;
  idiomas?: string[] | null;
  ubicacion?: string | null;
  ordenarPor?: OrdenarPor;
  pagina: number;
  limite: number;
  // Avanzados
  //experienciasLaborales?: ExperienciaLaboral[] | null;
  //habilidadesTecnicas?: HabilidadTecnica[] | null;
  //habilidadesBlandas?: HabilidadBlanda[] | null;
  //proyectos?: Proyecto[] | null;
  //formacionAcademica?: FormacionAcademica[] | null;
  experienciaLaboral?: ExperienciaLaboral | null;
  habilidadTecnica?: HabilidadTecnica | null;
  habilidadBlanda?: HabilidadBlanda | null;
  proyecto?: Proyecto | null;
  formacionAcademica?: FormacionAcademica | null;
}

export interface PortafolioResultadoResponseDTO {
  id: number;
  nombreCompleto: string;
  profesion: string;
  especializacion?: string | null;
  ubicacion?: string | null;
  disponibilidad?: Disponibilidad | null;
  modalidadTrabajo?: ModalidadTrabajo | null;
  tecnologias?: string[] | null;
  idiomas?: string[] | null;
  experienciaAnios?: number | null;
  cantidadProyectos?: number | null;
  empresas?: string[] | null;
  fotoPerfilUrl?: string | null;
  urlPublica: string;
  resumen?: string | null;
}

export interface BuscarPortafoliosResponseDTO {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  data: PortafolioResultadoResponseDTO[];
}