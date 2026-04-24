import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import type { TechnicalSkill, SoftSkill, NivelDominio, SkillCategory } from '../models/skill.model';

type SkillType = 'TECNICA' | 'BLANDA';
type SkillFormData = TechnicalSkill | SoftSkill;

interface SkillFormModalProps {
  isOpen: boolean;
  skillType: SkillType;
  categories: SkillCategory[];
  initialData?: SkillFormData | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (data: SkillFormData) => Promise<void> | void;
}

export const SkillFormModal: React.FC<SkillFormModalProps> = ({
  isOpen,
  skillType,
  categories,
  initialData,
  isSubmitting = false,
  onClose,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [nivelDominio, setNivelDominio] = useState<NivelDominio>('BASICO');
  const [anosExperiencia, setAnosExperiencia] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [certificadoUrl, setCertificadoUrl] = useState('');
  const [evidenciaUrl, setEvidenciaUrl] = useState('');

  const filteredCategories = categories.filter(cat => cat.clasificacion === skillType);

  useEffect(() => {
    if (!isOpen) {
      // Reset form
      setNombre('');
      setIdCategoria('');
      setNivelDominio('BASICO');
      setAnosExperiencia(0);
      setDescripcion('');
      setCertificadoUrl('');
      setEvidenciaUrl('');
      return;
    }

    if (initialData) {
      setNombre(initialData.nombre);
      setIdCategoria(initialData.idCategoria);
      
      if ('nivelDominio' in initialData) {
        // Es TechnicalSkill
        setNivelDominio(initialData.nivelDominio);
        setAnosExperiencia(initialData.anosExperiencia);
        setDescripcion(initialData.descripcion || '');
        setCertificadoUrl(initialData.certificadoUrl || '');
      } else {
        // Es SoftSkill
        setEvidenciaUrl(initialData.evidenciaUrl || '');
      }
    }
  }, [isOpen, initialData, skillType]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!idCategoria) {
      alert('Por favor selecciona una categoría');
      return;
    }

    let formData: SkillFormData;

    if (skillType === 'TECNICA') {
      formData = {
        ...(initialData && 'id' in initialData ? { id: (initialData as TechnicalSkill).id } : {}),
        nombre: nombre.trim(),
        idCategoria: Number(idCategoria),
        nivelDominio,
        anosExperiencia,
        descripcion: descripcion.trim(),
        certificadoUrl: certificadoUrl.trim() || undefined,
      } as TechnicalSkill;
    } else {
      formData = {
        ...(initialData && 'id' in initialData ? { id: (initialData as SoftSkill).id } : {}),
        nombre: nombre.trim(),
        idCategoria: Number(idCategoria),
        evidenciaUrl: evidenciaUrl.trim() || undefined,
      } as SoftSkill;
    }

    await onSubmit(formData);
  };

  const title = skillType === 'TECNICA'
    ? initialData ? 'Editar Habilidad Técnica' : 'Agregar Habilidad Técnica'
    : initialData ? 'Editar Habilidad Blanda' : 'Agregar Habilidad Blanda';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-2xl bg-card-bg border border-card-border rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full rounded-lg border border-card-border bg-transparent px-4 py-3 text-text-primary outline-none"
              placeholder={skillType === 'TECNICA' ? 'Ej: Java Spring Boot, React' : 'Ej: Comunicación Asertiva'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Categoría *
            </label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(Number(e.target.value))}
              required
              className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text-primary outline-none"
            >
              <option value="">Selecciona una categoría</option>
              {filteredCategories.map(cat => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {skillType === 'TECNICA' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nivel de Dominio *
                  </label>
                  <select
                    value={nivelDominio}
                    onChange={(e) => setNivelDominio(e.target.value as NivelDominio)}
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text-primary outline-none"
                  >
                    <option value="BASICO">Básico</option>
                    <option value="INTERMEDIO">Intermedio</option>
                    <option value="AVANZADO">Avanzado</option>
                    <option value="EXPERTO">Experto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Años de Experiencia
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={anosExperiencia}
                    onChange={(e) => setAnosExperiencia(Number(e.target.value))}
                    className="w-full rounded-lg border border-card-border bg-transparent px-4 py-3 text-text-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-card-border bg-transparent px-4 py-3 text-text-primary outline-none"
                  placeholder="Describe tu experiencia con esta habilidad..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  URL del Certificado
                </label>
                <input
                  type="url"
                  value={certificadoUrl}
                  onChange={(e) => setCertificadoUrl(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-transparent px-4 py-3 text-text-primary outline-none"
                  placeholder="https://link-al-certificado.com"
                />
              </div>
            </>
          )}

          {skillType === 'BLANDA' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL de Evidencia
              </label>
              <input
                type="url"
                value={evidenciaUrl}
                onChange={(e) => setEvidenciaUrl(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-transparent px-4 py-3 text-text-primary outline-none"
                placeholder="https://link-a-evidencia.com"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};