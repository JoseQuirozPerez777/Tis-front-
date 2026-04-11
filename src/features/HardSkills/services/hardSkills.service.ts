import type { HardSkill } from '../models/hardSkill.model';

export const hardSkillsService = {
  async addHardSkill(skill: Omit<HardSkill, 'id'>): Promise<HardSkill> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...skill,
      id: Math.random().toString(36).substr(2, 9),
    };
  }
};
