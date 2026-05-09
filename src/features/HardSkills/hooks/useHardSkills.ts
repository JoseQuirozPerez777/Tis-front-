import { useState, useEffect } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { hardSkillsService } from '../services/hardSkills.service';
import type { CategoriaDto } from '../models/hardSkill.model';

export const useHardSkills = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [masteryLevel, setMasteryLevel] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);

  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await hardSkillsService.getCategories();
        // Filtrar las categorías de tipo TECNICA si es necesario, 
        // asumiendo que el endpoint trae todas.
        const tecnicas = data.filter(c => c.clasificacion === 'TECNICA');
        setCategorias(tecnicas.length > 0 ? tecnicas : data);
      } catch (error) {
        console.error('Error al cargar categorías', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!categoryId) {
      showToast('Por favor, selecciona una categoría.', 'error');
      setIsLoading(false);
      return;
    }

    if (!masteryLevel) {
      showToast('Por favor, selecciona un nivel de dominio.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const newSkill = await hardSkillsService.addHardSkill({
        name,
        masteryLevel,
        categoryId: Number(categoryId),
        yearsOfExperience: Number(yearsOfExperience),
        description,
        certificateTest
      });
      showToast(`Habilidad ${newSkill.name} añadida con éxito.`, 'success');
      // Limpiar formulario
      setName('');
      setMasteryLevel('');
      setCategoryId('');
      setYearsOfExperience('');
      setDescription('');
      setCertificateTest(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al añadir la habilidad';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
      navigate(-1);
    }
  };

  const handleCancel = () => {
    setName('');
    setMasteryLevel('');
    setCategoryId('');
    setYearsOfExperience('');
    setDescription('');
    setCertificateTest(null);
    navigate(-1);
  };

  return {
    name, setName,
    masteryLevel, setMasteryLevel,
    categoryId, setCategoryId,
    categorias,
    yearsOfExperience, setYearsOfExperience,
    description, setDescription,
    certificateTest, setCertificateTest,
    isLoading,
    handleAddSkill,
    handleCancel
  };
};
