import type { AcademicTraining } from '../models/academicTraining.model';

const API_URL = 'http://localhost:8081/api';

export const academicTrainingService = {
  async addAcademicTraining(training: Omit<AcademicTraining, 'id'>): Promise<AcademicTraining> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const dto = {
      institucion: training.institution,
      tituloObtenido: training.degree,
      area: training.fieldOfStudy,
      nivel: training.level,
      fechaInicio: training.startDate,
      fechaFin: training.endDate ? training.endDate : null,
      estado: training.status,
      descripcion: training.description,
      urlImagen: '' // Manejo de subida de archivos pendiente si aplica
    };

    const response = await fetch(`${API_URL}/formacion/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al guardar la formación académica');
    }

    const data = await response.json();

    return {
      ...training,
      id: data.data?.id?.toString(),
    };
  }
};
