import { apiClient } from '@/core/api/api-client';

export const dashMyPerfilService = {
  async getPortfolioSummary() {
    return await apiClient.get('/portafolio/mi-resumen');
  },
};
