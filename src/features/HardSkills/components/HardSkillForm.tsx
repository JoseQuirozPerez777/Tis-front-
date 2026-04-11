import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useHardSkills } from '../hooks/useHardSkills';

export const HardSkillForm = () => {
  const {
    name, setName,
    masteryLevel, setMasteryLevel,
    category, setCategory,
    yearsOfExperience, setYearsOfExperience,
    description, setDescription,
    setCertificateTest,
    isLoading,
    handleAddSkill
  } = useHardSkills();

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          Añadir Habilidad
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          Registra tus conocimientos técnicos (Hard Skills)
        </p>
      </div>

      <form onSubmit={handleAddSkill} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Nombre de la Habilidad"
            type="text"
            placeholder="Ej. React, Node.js, Python..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Nivel de Dominio
            </label>
            <select
              value={masteryLevel}
              onChange={(e) => setMasteryLevel(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="Selecciona" className="bg-brand-azul-profundo text-white">Selecciona</option>
              <option value="Básico" className="bg-brand-azul-profundo text-white">Básico</option>
              <option value="Intermedio" className="bg-brand-azul-profundo text-white">Intermedio</option>
              <option value="Avanzado" className="bg-brand-azul-profundo text-white">Avanzado</option>
              <option value="Experto" className="bg-brand-azul-profundo text-white">Experto</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="Seleccionar" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              <option value="Programación" className="bg-brand-azul-profundo text-white">Programación</option>
              <option value="Base de Datos" className="bg-brand-azul-profundo text-white">Base de Datos</option>
              <option value="Desarrollo Web" className="bg-brand-azul-profundo text-white">Desarrollo Web</option>
              <option value="DevOps" className="bg-brand-azul-profundo text-white">DevOps</option>
            </select>
          </div>

          <Input
            label="Años de Experiencia"
            type="number"
            min="0"
            step="0.5"
            placeholder="Ej. 2"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value !== '' ? Number(e.target.value) : '')}
            required
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Descripción
            </label>
            <textarea
              placeholder="Breve descripción de tu experiencia con esta habilidad..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="flex w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Prueba o Certificado (Opcional)
            </label>
            <input
              type="file"
              onChange={(e) => setCertificateTest(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent-neon/10 file:text-brand-accent-neon hover:file:bg-brand-accent-neon/20 transition-all cursor-pointer"
            />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full h-14 text-lg font-bold tracking-wide mt-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Guardar Habilidad
        </Button>
      </form>
    </div>
  );
};
