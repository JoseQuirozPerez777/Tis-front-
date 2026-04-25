import { useSoftSkills } from '../hooks/useSoftSkills';
import type { SoftSkillResponse } from '../models/softSkill.model';

interface SoftSkillsListProps {
  onEditSkill?: (skill: SoftSkillResponse) => void;
}

export const SoftSkillsList = ({ onEditSkill }: SoftSkillsListProps) => {
  const { skills, isLoadingSkills, handleEdit, handleDelete } = useSoftSkills();

  if (isLoadingSkills) {
    return (
      <div className="text-center text-text-muted py-8">Cargando habilidades...</div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center text-text-muted py-8">
        No tienes habilidades blandas registradas aún.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-text-muted">Total: {skills.length} habilidad(es)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill: SoftSkillResponse) => (
          <div
            key={skill.id}
            className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-brand-accent-neon/30 transition-all duration-200 hover:bg-white/10"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary">{skill.nombre}</h3>
                <p className="text-sm text-text-muted">{skill.categoria.nombre}</p>
              </div>
            </div>

            {skill.evidenciaUrl && (
              <div className="mb-4">
                <a
                  href={skill.evidenciaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-accent-neon hover:underline inline-flex items-center gap-2"
                >
                  <span>🔗</span> Ver evidencia
                </a>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => onEditSkill ? onEditSkill(skill) : handleEdit(skill)}
                className="flex-1 py-2 px-3 bg-brand-accent-neon/20 hover:bg-brand-accent-neon/30 text-brand-accent-neon rounded text-sm font-medium transition-all"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="flex-1 py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-sm font-medium transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
