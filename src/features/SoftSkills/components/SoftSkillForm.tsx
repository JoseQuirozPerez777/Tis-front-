import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useSoftSkills } from '../hooks/useSoftSkills';

export const SoftSkillForm = () => {
  const {
    name, setName,
    level, setLevel,
    type, setType,
    evidenceContext, setEvidenceContext,
    isLoading,
    handleAddSkill,
    handleCancel
  } = useSoftSkills();

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          Agregar Nueva Habilidad Blanda
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          Registra tus aptitudes personales e interpersonales
        </p>
      </div>

      <form onSubmit={handleAddSkill} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Nombre de la habilidad"
            type="text"
            placeholder="Ej. Escucha activa, Resolución de conflictos..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Nivel
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="Seleccionar" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              <option value="Básico" className="bg-brand-azul-profundo text-white">Básico</option>
              <option value="Intermedio" className="bg-brand-azul-profundo text-white">Intermedio</option>
              <option value="Avanzado" className="bg-brand-azul-profundo text-white">Avanzado</option>
              <option value="Experto" className="bg-brand-azul-profundo text-white">Experto</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="Seleccionar" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              <option value="Comunicación" className="bg-brand-azul-profundo text-white">Comunicación</option>
              <option value="Trabajo en equipo" className="bg-brand-azul-profundo text-white">Trabajo en equipo</option>
              <option value="Liderazgo" className="bg-brand-azul-profundo text-white">Liderazgo</option>
              <option value="Pensamiento crítico" className="bg-brand-azul-profundo text-white">Pensamiento crítico</option>
              <option value="Gestión del tiempo" className="bg-brand-azul-profundo text-white">Gestión del tiempo</option>
              <option value="Adaptabilidad" className="bg-brand-azul-profundo text-white">Adaptabilidad</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Evidencia Contexto
            </label>
            <select
              value={evidenceContext}
              onChange={(e) => setEvidenceContext(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="Seleccionar" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              <option value="Académico" className="bg-brand-azul-profundo text-white">Académico</option>
              <option value="Laboral" className="bg-brand-azul-profundo text-white">Laboral</option>
              <option value="Personal" className="bg-brand-azul-profundo text-white">Personal</option>
              <option value="Proyecto" className="bg-brand-azul-profundo text-white">Proyecto</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-14 text-lg font-bold tracking-wide transition-all border-white/20 hover:bg-white/5"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1 h-14 text-lg font-bold tracking-wide shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};
