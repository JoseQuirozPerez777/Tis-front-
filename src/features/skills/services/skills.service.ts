import { apiClient } from '@/core/api/api-client';
import type { TechnicalSkill, SoftSkill, SkillCategory, SkillResponse } from '../models/skill.model';

export const skillsService = {
  // ============ CATEGORÍAS ============
  getCategories: async (): Promise<SkillCategory[]> => {
    return apiClient.get<SkillCategory[]>('/habilidades/categorias');
  },

  // ============ HABILIDADES TÉCNICAS ============
  getTechnicalSkills: async (): Promise<TechnicalSkill[]> => {
    return apiClient.get<TechnicalSkill[]>('/habilidades-tecnicas/mis-habilidades');
  },

  createTechnicalSkill: async (skill: Omit<TechnicalSkill, 'id'>): Promise<SkillResponse> => {
    return apiClient.post<SkillResponse>('/habilidades-tecnicas/registrar', skill);
  },

  updateTechnicalSkill: async (skill: TechnicalSkill): Promise<SkillResponse> => {
    return apiClient.put<SkillResponse>('/habilidades-tecnicas/actualizar', skill);
  },

  deleteTechnicalSkill: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/habilidades-tecnicas/eliminar/${id}`);
  },

  // ============ HABILIDADES BLANDAS ============
  getSoftSkills: async (): Promise<SoftSkill[]> => {
    return apiClient.get<SoftSkill[]>('/habilidades-blandas/mis-habilidades');
  },

  createSoftSkill: async (skill: Omit<SoftSkill, 'id'>): Promise<SkillResponse> => {
    return apiClient.post<SkillResponse>('/habilidades-blandas/registrar', skill);
  },

  updateSoftSkill: async (skill: SoftSkill): Promise<SkillResponse> => {
    return apiClient.put<SkillResponse>('/habilidades-blandas/actualizar', skill);
  },

  deleteSoftSkill: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/habilidades-blandas/eliminar/${id}`);
  },
};
