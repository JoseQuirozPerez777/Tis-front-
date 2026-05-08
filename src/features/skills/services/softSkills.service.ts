import { apiClient } from '@core/api/api-client';
import type { CreateSoftSkillRequest, UpdateSoftSkillRequest, SoftSkillResponse, SoftSkillRegistrationResponse } from '../models/softSkill.model';

export const softSkillsService = {
  async registerSoftSkill(skill: CreateSoftSkillRequest): Promise<SoftSkillRegistrationResponse> {
    return apiClient.post<SoftSkillRegistrationResponse>('/habilidades-blandas/registrar', skill);
  },

  async updateSoftSkill(skill: UpdateSoftSkillRequest): Promise<{ message: string }> {
    return apiClient.put<{ message: string }>('/habilidades-blandas/actualizar', skill);
  },

  async getMySoftSkills(): Promise<SoftSkillResponse[]> {
    return apiClient.get<SoftSkillResponse[]>('/habilidades-blandas/mis-habilidades');
  },

  async deleteSoftSkill(id: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/habilidades-blandas/eliminar/${id}`);
  }
};
