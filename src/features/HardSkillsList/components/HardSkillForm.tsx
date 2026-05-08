import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useHardSkills } from '../hooks/useHardSkills';
import type { HardSkillResponse } from '../models/hardSkill.model';
import { useEffect } from 'react';

const CATEGORIES = [
  { id: 1, nombre: 'Backend' },
  { id: 1, nombre: 'Frontend' },
  { id: 1, nombre: 'Base de Datos' },
  { id: 1, nombre: 'DevOps' },
  { id: 1, nombre: 'Móvil' },
];

interface HardSkillFormProps {
  compact?: boolean;
  editingSkill?: HardSkillResponse | null;
  onCancelEdit?: () => void;
}

export const HardSkillForm = ({ compact = false, editingSkill = null, onCancelEdit }: HardSkillFormProps) => {  const {
    nombre, setNombre,
    nivelDominio, setNivelDominio,
    idCategoria, setIdCategoria,
    anosExperiencia, setAnosExperiencia,
    descripcion, setDescripcion,
    certificadoUrl, setCertificadoUrl,
    isLoading,
    editingId, setEditingId,
    handleSubmit,
    resetForm
  } = useHardSkills();

  useEffect(() => {
  if (editingSkill) {
    setEditingId(editingSkill.id);
    setNombre(editingSkill.nombre);
    setNivelDominio(editingSkill.nivelDominio);
    setAnosExperiencia(editingSkill.anosExperiencia || '');
    setDescripcion(editingSkill.descripcion || '');
    setCertificadoUrl(editingSkill.certificadoUrl || '');
    setIdCategoria(editingSkill.categoria.idCategoria);
  }
}, [editingSkill]);

  const handleCancel = () => {
    resetForm();
    onCancelEdit?.();
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre *"
            type="text"
            placeholder="Ej. React, Node.js..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Nivel *
            </label>
            <select
              value={nivelDominio}
              onChange={(e) => setNivelDominio(e.target.value as any)}
              required
              className="flex h-11 w-full rounded-lg border border-white/10 bg-brand-azul-profundo px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="BASICO" className="bg-brand-azul-profundo text-white">Básico</option>
              <option value="INTERMEDIO" className="bg-brand-azul-profundo text-white">Intermedio</option>
              <option value="AVANZADO" className="bg-brand-azul-profundo text-white">Avanzado</option>
              <option value="EXPERTO" className="bg-brand-azul-profundo text-white">Experto</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Categoría *
            </label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value !== '' ? Number(e.target.value) : '')}
              required
              className="flex h-11 w-full rounded-lg border border-white/10 bg-brand-azul-profundo px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Años de Experiencia"
            type="number"
            min="0"
            step="0.5"
            placeholder="Ej. 2"
            value={anosExperiencia}
            onChange={(e) => setAnosExperiencia(e.target.value !== '' ? Number(e.target.value) : '')}
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />
        </div>

        <Input
          label="Descripción"
          placeholder="Breve descripción de tu experiencia..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />

        <Input
          label="URL del Certificado"
          type="url"
          placeholder="https://ejemplo.com/certificado.pdf"
          value={certificadoUrl}
          onChange={(e) => setCertificadoUrl(e.target.value)}
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1 h-11 text-base font-bold"
          >
            {editingId ? 'Actualizar' : 'Guardar'} Habilidad
          </Button>
          {editingId && (
            <Button
              type="button"
              onClick={handleCancel}
              className="flex-1 h-11 text-base font-bold bg-white/10 hover:bg-white/20"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          {editingId ? 'Actualizar' : 'Añadir'} Habilidad Técnica
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          {editingId ? 'Modifica tu habilidad técnica' : 'Registra tus conocimientos técnicos (Hard Skills)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Nombre de la Habilidad *"
            type="text"
            placeholder="Ej. React, Node.js, Python..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Nivel de Dominio *
            </label>
            <select
              value={nivelDominio}
              onChange={(e) => setNivelDominio(e.target.value as any)}
              required
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="BASICO" className="bg-brand-azul-profundo text-white">Básico</option>
              <option value="INTERMEDIO" className="bg-brand-azul-profundo text-white">Intermedio</option>
              <option value="AVANZADO" className="bg-brand-azul-profundo text-white">Avanzado</option>
              <option value="EXPERTO" className="bg-brand-azul-profundo text-white">Experto</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Categoría *
            </label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value !== '' ? Number(e.target.value) : '')}
              required
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-brand-azul-profundo text-white">
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Años de Experiencia"
            type="number"
            min="0"
            step="0.5"
            placeholder="Ej. 2"
            value={anosExperiencia}
            onChange={(e) => setAnosExperiencia(e.target.value !== '' ? Number(e.target.value) : '')}
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Descripción
            </label>
            <textarea
              placeholder="Breve descripción de tu experiencia con esta habilidad..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="flex w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200 resize-none"
            />
          </div>

          <Input
            label="URL del Certificado"
            type="url"
            placeholder="https://ejemplo.com/certificado.pdf"
            value={certificadoUrl}
            onChange={(e) => setCertificadoUrl(e.target.value)}
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1 h-14 text-lg font-bold tracking-wide shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {editingId ? 'Actualizar' : 'Guardar'} Habilidad
          </Button>
          {editingId && (
            <Button
              type="button"
              onClick={handleCancel}
              className="flex-1 h-14 text-lg font-bold tracking-wide bg-white/10 hover:bg-white/20 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
