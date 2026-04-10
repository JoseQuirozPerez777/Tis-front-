import { useState } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { hardSkillsService } from '../services/hardSkills.service';

export const useHardSkills = () => {
  const [name, setName] = useState('');
  const [masteryLevel, setMasteryLevel] = useState('Básico');
  const [category, setCategory] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newSkill = await hardSkillsService.addHardSkill({
        name,
        masteryLevel,
        category,
        yearsOfExperience: Number(yearsOfExperience),
        description,
        certificateTest
      });
      showToast(`Habilidad ${newSkill.name} añadida con éxito.`, 'success');
      // Limpiar formulario
      setName('');
      setMasteryLevel('Básico');
      setCategory('');
      setYearsOfExperience('');
      setDescription('');
      setCertificateTest(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al añadir la habilidad';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name, setName,
    masteryLevel, setMasteryLevel,
    category, setCategory,
    yearsOfExperience, setYearsOfExperience,
    description, setDescription,
    certificateTest, setCertificateTest,
    isLoading,
    handleAddSkill
  };
};
