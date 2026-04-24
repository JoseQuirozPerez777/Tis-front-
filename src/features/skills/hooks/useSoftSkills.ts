import { useState, useEffect } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { softSkillsService } from '../services/softSkills.service';
import type { SoftSkillResponse, CreateSoftSkillRequest, UpdateSoftSkillRequest } from '../models/softSkill.model';

export const useSoftSkills = () => {
  const [nombre, setNombre] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [evidenciaUrl, setEvidenciaUrl] = useState('');
  
  const [skills, setSkills] = useState<SoftSkillResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { showToast } = useToast();

  // Cargar habilidades
  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setIsLoadingSkills(true);
      const response = await softSkillsService.getMySoftSkills();
      setSkills(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar las habilidades';
      showToast(message, 'error');
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        // Actualizar habilidad
        const updateData: UpdateSoftSkillRequest = {
          id: editingId,
          nombre,
          evidenciaUrl: evidenciaUrl || undefined,
          idCategoria: Number(idCategoria),
        };
        await softSkillsService.updateSoftSkill(updateData);
        showToast('Habilidad actualizada con éxito.', 'success');
      } else {
        // Registrar nueva habilidad
        const newSkillData: CreateSoftSkillRequest = {
          nombre,
          evidenciaUrl: evidenciaUrl || undefined,
          idCategoria: Number(idCategoria),
        };
        await softSkillsService.registerSoftSkill(newSkillData);
        showToast(`Habilidad ${nombre} registrada con éxito.`, 'success');
      }
      
      // Limpiar formulario y recargar
      resetForm();
      await loadSkills();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al guardar la habilidad';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (skill: SoftSkillResponse) => {
    setEditingId(skill.id);
    setNombre(skill.nombre);
    setIdCategoria(skill.categoria.idCategoria);
    setEvidenciaUrl(skill.evidenciaUrl || '');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) return;
    
    try {
      await softSkillsService.deleteSoftSkill(id);
      showToast('Habilidad eliminada con éxito.', 'success');
      await loadSkills();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar la habilidad';
      showToast(message, 'error');
    }
  };

  const resetForm = () => {
    setNombre('');
    setIdCategoria('');
    setEvidenciaUrl('');
    setEditingId(null);
  };

  return {
    // Formulario
    nombre, setNombre,
    idCategoria, setIdCategoria,
    evidenciaUrl, setEvidenciaUrl,
    // Estado
    isLoading,
    isLoadingSkills,
    skills,
    editingId,
    // Métodos
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    loadSkills
  };
};
