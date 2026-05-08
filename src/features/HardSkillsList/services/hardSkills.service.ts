import { apiClient } from '@core/api/api-client';
import type { CreateHardSkillRequest, UpdateHardSkillRequest, HardSkillResponse, HardSkillRegistrationResponse } from '../models/hardSkill.model';

export const hardSkillsService = {
  async registerHardSkill(skill: CreateHardSkillRequest): Promise<HardSkillRegistrationResponse> {
    return apiClient.post<HardSkillRegistrationResponse>('/habilidades-tecnicas/registrar', skill);
  },

  async updateHardSkill(skill: UpdateHardSkillRequest): Promise<{ message: string }> {
    return apiClient.put<{ message: string }>('/habilidades-tecnicas/actualizar', skill);
  },

  async getMyHardSkills(): Promise<HardSkillResponse[]> {
    return apiClient.get<HardSkillResponse[]>('/habilidades-tecnicas/mis-habilidades');
  },

  async deleteHardSkill(id: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/habilidades-tecnicas/eliminar/${id}`);
  }
};
