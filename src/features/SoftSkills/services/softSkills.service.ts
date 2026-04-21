import type { SoftSkill } from '../models/softSkill.model';

export const softSkillsService = {
  async addSoftSkill(skill: Omit<SoftSkill, 'id'>): Promise<SoftSkill> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...skill,
      id: Math.random().toString(36).substr(2, 9),
    };
  }
};
