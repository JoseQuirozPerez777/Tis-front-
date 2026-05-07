import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { softSkillsService } from '../services/softSkills.service';
import type { CategoriaDto } from '../models/softSkill.model';

export const useSoftSkills = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const cats = await softSkillsService.getCategorias();
        setCategorias(cats.filter(c => c.clasificacion === 'BLANDA'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategorias();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCategoria) {
      showToast('Por favor seleccione una categoría', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await softSkillsService.addSoftSkill({
        nombre: name,
        idCategoria: Number(idCategoria),
        descripcion: description,
        evidenciaUrl: '' // Empty for now as file upload requires a different endpoint
      });
      showToast(response.message || `Habilidad añadida con éxito.`, 'success');
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
    setIdCategoria('');
    setDescription('');
    setCertificateTest(null);
    navigate(-1);
  };

  return {
    name, setName,
    idCategoria, setIdCategoria,
    description, setDescription,
    certificateTest, setCertificateTest,
    categorias,
    isLoading,
    handleAddSkill,
    handleCancel
  };
};
