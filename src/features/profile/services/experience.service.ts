import type { Experience, ExperienceFormData } from '../models/experience.model';
import type { ExperienceDto } from './experience.dto';
import {
  adaptExperience,
  adaptExperiences,
  adaptExperienceToCreateDto,
} from './experience.adapter';

const BASE_URL = 'http://localhost:8081/api/experiencia-laboral';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('jwt');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await fetch(`${BASE_URL}/mis-experiencias`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudieron obtener las experiencias.');
  }

  const data = (await response.json()) as ExperienceDto[];
  return adaptExperiences(data);
};

export const createExperience = async (
  formData: ExperienceFormData
): Promise<Experience> => {
  const payload = adaptExperienceToCreateDto(formData);

  console.log('PAYLOAD EXPERIENCE:', payload);

  const response = await fetch(`${BASE_URL}/registrar`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ERROR BACKEND EXPERIENCE:', errorText);
    throw new Error(errorText || 'No se pudo registrar la experiencia.');
  }

  const data = (await response.json()) as ExperienceDto;
  return adaptExperience(data);
};

export const updateExperience = async (
  id: number,
  formData: ExperienceFormData
): Promise<Experience> => {
  const payload = {
    id,
    ...adaptExperienceToCreateDto(formData),
  };

  const response = await fetch(`${BASE_URL}/actualizar`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo actualizar la experiencia.');
  }

  const data = (await response.json()) as ExperienceDto;
  return adaptExperience(data);
};

export const deleteExperience = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/eliminar/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo eliminar la experiencia.');
  }
};