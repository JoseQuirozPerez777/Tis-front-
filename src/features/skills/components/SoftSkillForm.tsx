import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useSoftSkills } from '../hooks/useSoftSkills';

const CATEGORIES = [
  { id: 2, nombre: 'Laboral' },
  { id: 3, nombre: 'Comunicación' },
  { id: 4, nombre: 'Liderazgo' },
  { id: 5, nombre: 'Creatividad' },
];

interface SoftSkillFormProps {
  compact?: boolean;
}

export const SoftSkillForm = ({ compact = false }: SoftSkillFormProps) => {
  const {
    nombre, setNombre,
    idCategoria, setIdCategoria,
    evidenciaUrl, setEvidenciaUrl,
    isLoading,
    editingId,
    handleSubmit,
    resetForm
  } = useSoftSkills();

  const handleCancel = () => {
    resetForm();
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre *"
            type="text"
            placeholder="Ej. Comunicación Asertiva..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Categoría *
            </label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value !== '' ? Number(e.target.value) : '')}
              required
              className="flex h-11 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all"
            >
              <option value="">Seleccionar</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="URL de Evidencia"
          type="url"
          placeholder="https://linkedin.com/tu-referencia"
          value={evidenciaUrl}
          onChange={(e) => setEvidenciaUrl(e.target.value)}
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
          {editingId ? 'Actualizar' : 'Añadir'} Habilidad Blanda
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          {editingId ? 'Modifica tu habilidad blanda' : 'Registra tus habilidades blandas (Soft Skills)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Nombre de la Habilidad *"
            type="text"
            placeholder="Ej. Comunicación Asertiva, Liderazgo..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

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
            label="URL de Evidencia"
            type="url"
            placeholder="https://linkedin.com/tu-referencia"
            value={evidenciaUrl}
            onChange={(e) => setEvidenciaUrl(e.target.value)}
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
