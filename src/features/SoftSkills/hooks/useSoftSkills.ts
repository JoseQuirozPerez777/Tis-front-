import { useState } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { softSkillsService } from '../services/softSkills.service';

export const useSoftSkills = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Seleccionar');
  const [type, setType] = useState('Seleccionar');
  const [evidenceContext, setEvidenceContext] = useState('Seleccionar');
  
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newSkill = await softSkillsService.addSoftSkill({
        name,
        level,
        type,
        evidenceContext
      });
      showToast(`Habilidad ${newSkill.name} añadida con éxito.`, 'success');
      // Limpiar formulario
      setName('');
      setLevel('Seleccionar');
      setType('Seleccionar');
      setEvidenceContext('Seleccionar');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al añadir la habilidad';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Optionally redirect or just clear
    setName('');
    setLevel('Seleccionar');
    setType('Seleccionar');
    setEvidenceContext('Seleccionar');
  };

  return {
    name, setName,
    level, setLevel,
    type, setType,
    evidenceContext, setEvidenceContext,
    isLoading,
    handleAddSkill,
    handleCancel
  };
};
