import type { HardSkill, HardSkillRequestDto, CategoriaDto } from '../models/hardSkill.model';

const API_URL = 'http://localhost:8081/api';

export const hardSkillsService = {
  async getCategories(): Promise<CategoriaDto[]> {
    const token = sessionStorage.getItem('jwt');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/habilidades/categorias`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }

    const data = await response.json();
    return data;
  },

  async addHardSkill(skill: Omit<HardSkill, 'id'>): Promise<HardSkill> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const dto: HardSkillRequestDto = {
      nombre: skill.name,
      idCategoria: skill.categoryId,
      nivelDominio: skill.masteryLevel,
      anosExperiencia: skill.yearsOfExperience,
      descripcion: skill.description,
      certificadoUrl: ''
    };

    const response = await fetch(`${API_URL}/habilidades-tecnicas/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al guardar la habilidad');
    }

    const data = await response.json();
    
    return {
      ...skill,
      id: data.id?.toString(),
    };
  }
};
