export interface CategoriaResponse {
  idCategoria: number;
  nombre: string;
  clasificacion: string;
}

export interface SoftSkillRequestDTO {
  nombre: string;
  idCategoria: number;
  evidenciaUrl?: string;
  descripcion?: string;
}

export const softSkillsService = {
  async getCategorias(): Promise<CategoriaResponse[]> {
    const token = sessionStorage.getItem('jwt');
    const response = await fetch('http://localhost:8081/api/habilidades/categorias', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al obtener categorías');
    return await response.json();
  },

  async addSoftSkill(skill: SoftSkillRequestDTO): Promise<any> {
    const token = sessionStorage.getItem('jwt');
    const response = await fetch('http://localhost:8081/api/habilidades-blandas/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(skill)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al añadir la habilidad blanda');
    }

    return await response.json();
  }
};
