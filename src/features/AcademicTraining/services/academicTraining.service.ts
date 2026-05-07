import type { AcademicTraining } from '../models/academicTraining.model';

export const academicTrainingService = {
  async addAcademicTraining(training: Omit<AcademicTraining, 'id'>): Promise<AcademicTraining> {
    // Mock API call — reemplazar con endpoint real cuando el backend esté listo
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...training,
      id: Math.random().toString(36).substr(2, 9),
    };
  }
};
