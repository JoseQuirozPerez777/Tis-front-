import type { Experience, ExperienceFormData } from '../models/experience.model';
import type { CreateExperienceDto, ExperienceDto } from './experience.dto';

export const adaptExperience = (dto: ExperienceDto): Experience => {
  return {
    id: dto.id,
    empresa: dto.empresa,
    cargo: dto.cargo,
    fechaInicio: dto.fechaInicio,
    fechaFin: dto.fechaFin,
    esTrabajoActual: dto.esTrabajoActual,
    descripcion: dto.descripcion,
  };
};

export const adaptExperiences = (dtos: ExperienceDto[]): Experience[] => {
  return dtos.map(adaptExperience);
};

const mapMonthToLocalDate = (value: string): string | null => {
  if (!value) return null;
  return `${value}-01`;
};

export const adaptExperienceToCreateDto = (
  formData: ExperienceFormData
): CreateExperienceDto => {
  return {
    empresa: formData.empresa,
    cargo: formData.cargo,
    fechaInicio: mapMonthToLocalDate(formData.fechaInicio)!,
    fechaFin: formData.esTrabajoActual
      ? null
      : mapMonthToLocalDate(formData.fechaFin),
    descripcion: formData.descripcion,
    esTrabajoActual: formData.esTrabajoActual,
  };
};