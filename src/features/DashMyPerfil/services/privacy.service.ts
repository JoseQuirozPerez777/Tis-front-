import { apiClient } from '@/core/api/api-client';

export const dashMyPerfilService = {
  async getPortfolioSummary() {
    return await apiClient.get('/portafolio/mi-resumen');
  },

  async getVisibilitySettings() {
    return await apiClient.get<Record<string, boolean>>('/visibilidad/mis-ajustes');
  },

  async getVisibilityElements() {
    return await apiClient.get<Record<string, Array<{ id: number; nombre: string; esPublico: boolean }>>>('/visibilidad/mis-elementos');
  },

  async saveVisibilitySettings(settings: Record<string, boolean>) {
    return await apiClient.post('/visibilidad/guardar-ajustes', settings);
  },

  async saveVisibilityElements(payload: Partial<Record<string, Array<{ id: number; esPublico: boolean }>>>) {
    return await apiClient.post('/visibilidad/guardar-elementos', payload);
  },
};
