import { useState, useEffect } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { hardSkillsService } from '../services/hardSkills.service';
import type {
  HardSkillResponse,
  CreateHardSkillRequest,
  UpdateHardSkillRequest,
} from '../models/hardSkill.model';

export const useHardSkills = () => {
  const [nombre, setNombre] = useState('');
  const [nivelDominio, setNivelDominio] = useState<'BASICO' | 'INTERMEDIO' | 'AVANZADO' | 'EXPERTO'>('BASICO');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [anosExperiencia, setAnosExperiencia] = useState<number | ''>('');
  const [descripcion, setDescripcion] = useState('');
  const [certificadoUrl, setCertificadoUrl] = useState('');

  const [skills, setSkills] = useState<HardSkillResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    loadSkills();
  }, []);

  useEffect(() => {
    const onEditSkill = (event: Event) => {
      const customEvent = event as CustomEvent<HardSkillResponse>;
      const skill = customEvent.detail;

      setEditingId(skill.id);
      setNombre(skill.nombre);
      setNivelDominio(skill.nivelDominio);
      setAnosExperiencia(skill.anosExperiencia || '');
      setDescripcion(skill.descripcion || '');
      setCertificadoUrl(skill.certificadoUrl || '');
      setIdCategoria(skill.categoria.idCategoria);
    };

    window.addEventListener('edit-hard-skill', onEditSkill);

    return () => {
      window.removeEventListener('edit-hard-skill', onEditSkill);
    };
  }, []);

  const loadSkills = async () => {
    try {
      setIsLoadingSkills(true);
      const response = await hardSkillsService.getMyHardSkills();
      setSkills(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar las habilidades técnicas';
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
        const updateData: UpdateHardSkillRequest = {
          id: editingId,
          nombre: nombre.trim(),
          nivelDominio,
          anosExperiencia: anosExperiencia !== '' ? Number(anosExperiencia) : undefined,
          descripcion: descripcion.trim() || undefined,
          certificadoUrl: certificadoUrl.trim() || undefined,
          idCategoria: Number(idCategoria),
        };

        await hardSkillsService.updateHardSkill(updateData);
        showToast('Habilidad técnica actualizada con éxito.', 'success');
      } else {
        const newSkillData: CreateHardSkillRequest = {
          nombre: nombre.trim(),
          nivelDominio,
          anosExperiencia: anosExperiencia !== '' ? Number(anosExperiencia) : undefined,
          descripcion: descripcion.trim() || undefined,
          certificadoUrl: certificadoUrl.trim() || undefined,
          idCategoria: Number(idCategoria),
        };

        await hardSkillsService.registerHardSkill(newSkillData);
        showToast(`Habilidad ${nombre} registrada con éxito.`, 'success');
      }

      resetForm();
      await loadSkills();

      //window.dispatchEvent(new CustomEvent('reload-hard-skills'));
      window.dispatchEvent(new CustomEvent('hard-skill-saved'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al guardar la habilidad técnica';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (skill: HardSkillResponse) => {
    window.dispatchEvent(
      new CustomEvent('edit-hard-skill', {
        detail: skill,
      })
    );

    window.dispatchEvent(new CustomEvent('show-hard-skill-form'));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) return;

    try {
      await hardSkillsService.deleteHardSkill(id);
      showToast('Habilidad técnica eliminada con éxito.', 'success');
      await loadSkills();

      window.dispatchEvent(new CustomEvent('reload-hard-skills'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar la habilidad técnica';
      showToast(message, 'error');
    }
  };

  const resetForm = () => {
    setNombre('');
    setNivelDominio('BASICO');
    setIdCategoria('');
    setAnosExperiencia('');
    setDescripcion('');
    setCertificadoUrl('');
    setEditingId(null);
  };

  return {
    nombre,
    setNombre,
    nivelDominio,
    setNivelDominio,
    idCategoria,
    setIdCategoria,
    anosExperiencia,
    setAnosExperiencia,
    descripcion,
    setDescripcion,
    certificadoUrl,
    setCertificadoUrl,
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