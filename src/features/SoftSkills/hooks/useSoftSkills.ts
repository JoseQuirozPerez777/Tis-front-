import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { softSkillsService } from '../services/softSkills.service';

export const useSoftSkills = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Seleccionar');
  const [type, setType] = useState('Seleccionar');
  const [evidenceContext, setEvidenceContext] = useState('Seleccionar');
  const [description, setDescription] = useState('');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);
  
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
        evidenceContext,
        description,
        certificateTest
      });
      showToast(`Habilidad ${newSkill.name} añadida con éxito.`, 'success');
      // Limpiar formulario
      handleCancel();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al añadir la habilidad';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setLevel('Seleccionar');
    setType('Seleccionar');
    setEvidenceContext('Seleccionar');
    setDescription('');
    setCertificateTest(null);
    navigate(-1);
  };

  return {
    name, setName,
    level, setLevel,
    type, setType,
    evidenceContext, setEvidenceContext,
    description, setDescription,
    certificateTest, setCertificateTest,
    isLoading,
    handleAddSkill,
    handleCancel
  };
};
