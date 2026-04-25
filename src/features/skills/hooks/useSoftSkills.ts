import { useState, useEffect } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { softSkillsService } from '../services/softSkills.service';
import type {
  SoftSkillResponse,
  CreateSoftSkillRequest,
  UpdateSoftSkillRequest,
} from '../models/softSkill.model';

export const useSoftSkills = () => {
  const [nombre, setNombre] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [evidenciaUrl, setEvidenciaUrl] = useState('');

  const [skills, setSkills] = useState<SoftSkillResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    loadSkills();
  }, []);

  useEffect(() => {
    const onEditSkill = (event: Event) => {
      const customEvent = event as CustomEvent<SoftSkillResponse>;
      const skill = customEvent.detail;

      setEditingId(skill.id);
      setNombre(skill.nombre);
      setIdCategoria(skill.categoria.idCategoria);
      setEvidenciaUrl(skill.evidenciaUrl || '');
    };

    window.addEventListener('edit-soft-skill', onEditSkill);

    return () => {
      window.removeEventListener('edit-soft-skill', onEditSkill);
    };
  }, []);

  const loadSkills = async () => {
    try {
      setIsLoadingSkills(true);
      const response = await softSkillsService.getMySoftSkills();
      setSkills(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar las habilidades blandas';
      showToast(message, 'error');
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      showToast('El nombre es obligatorio.', 'error');
      return;
    }

    if (!idCategoria) {
      showToast('La categoría es obligatoria.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      if (editingId) {
        const updateData: UpdateSoftSkillRequest = {
          id: editingId,
          nombre: nombre.trim(),
          evidenciaUrl: evidenciaUrl.trim() || undefined,
          idCategoria: Number(idCategoria),
        };

        await softSkillsService.updateSoftSkill(updateData);
        showToast('Habilidad blanda actualizada con éxito.', 'success');
      } else {
        const newSkillData: CreateSoftSkillRequest = {
          nombre: nombre.trim(),
          evidenciaUrl: evidenciaUrl.trim() || undefined,
          idCategoria: Number(idCategoria),
        };

        await softSkillsService.registerSoftSkill(newSkillData);
        showToast(`Habilidad ${nombre} registrada con éxito.`, 'success');
      }

      resetForm();
      await loadSkills();

      //window.dispatchEvent(new CustomEvent('reload-soft-skills'));
      window.dispatchEvent(new CustomEvent('soft-skill-saved'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al guardar la habilidad blanda';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (skill: SoftSkillResponse) => {
    window.dispatchEvent(
      new CustomEvent('edit-soft-skill', {
        detail: skill,
      })
    );

    window.dispatchEvent(new CustomEvent('show-soft-skill-form'));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) return;

    try {
      await softSkillsService.deleteSoftSkill(id);
      showToast('Habilidad blanda eliminada con éxito.', 'success');
      await loadSkills();

      window.dispatchEvent(new CustomEvent('reload-soft-skills'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar la habilidad blanda';
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
    nombre,
    setNombre,
    idCategoria,
    setIdCategoria,
    evidenciaUrl,
    setEvidenciaUrl,
    isLoading,
    isLoadingSkills,
    skills,
    editingId,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    loadSkills,
    setEditingId,
  };
};