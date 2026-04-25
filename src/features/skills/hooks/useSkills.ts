import { useState, useEffect } from 'react';
import type { TechnicalSkill, SoftSkill, SkillCategory } from '../models/skill.model';
import { skillsService } from '../services/skills.service';

export const useSkills = () => {
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await skillsService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const [technicalData, softData] = await Promise.all([
        skillsService.getTechnicalSkills(),
        skillsService.getSoftSkills(),
      ]);
      setTechnicalSkills(technicalData);
      setSoftSkills(softData);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching skills');
    } finally {
      setLoading(false);
    }
  };

  // ============ HABILIDADES TÉCNICAS ============
  const addTechnicalSkill = async (skill: Omit<TechnicalSkill, 'id'>) => {
    try {
      const response = await skillsService.createTechnicalSkill(skill);
      const newSkill: TechnicalSkill = {
        ...skill,
        id: response.id,
      };
      setTechnicalSkills((prev) => [...prev, newSkill]);
      return newSkill;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating technical skill');
      return null;
    }
  };

  const updateTechnicalSkill = async (skill: TechnicalSkill) => {
    try {
      await skillsService.updateTechnicalSkill(skill);
      setTechnicalSkills((prev) =>
        prev.map((s) => (s.id === skill.id ? skill : s))
      );
      return skill;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating technical skill');
      return null;
    }
  };

  const deleteTechnicalSkill = async (id: number) => {
    try {
      await skillsService.deleteTechnicalSkill(id);
      setTechnicalSkills((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting technical skill');
      return false;
    }
  };

  // ============ HABILIDADES BLANDAS ============
  const addSoftSkill = async (skill: Omit<SoftSkill, 'id'>) => {
    try {
      const response = await skillsService.createSoftSkill(skill);
      const newSkill: SoftSkill = {
        ...skill,
        id: response.id,
      };
      setSoftSkills((prev) => [...prev, newSkill]);
      return newSkill;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating soft skill');
      return null;
    }
  };

  const updateSoftSkill = async (skill: SoftSkill) => {
    try {
      await skillsService.updateSoftSkill(skill);
      setSoftSkills((prev) =>
        prev.map((s) => (s.id === skill.id ? skill : s))
      );
      return skill;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating soft skill');
      return null;
    }
  };

  const deleteSoftSkill = async (id: number) => {
    try {
      await skillsService.deleteSoftSkill(id);
      setSoftSkills((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting soft skill');
      return false;
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    technicalSkills,
    softSkills,
    categories,
    loading,
    error,
    addTechnicalSkill,
    updateTechnicalSkill,
    deleteTechnicalSkill,
    addSoftSkill,
    updateSoftSkill,
    deleteSoftSkill,
    refetch: fetchSkills,
  };
};