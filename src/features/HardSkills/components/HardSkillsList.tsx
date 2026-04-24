import { useHardSkills } from '../hooks/useHardSkills';
import type { HardSkillResponse } from '../models/hardSkill.model';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'BASICO':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'INTERMEDIO':
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    case 'AVANZADO':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'EXPERTO':
      return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

export const HardSkillsList = () => {
  const { skills, isLoadingSkills, handleEdit, handleDelete } = useHardSkills();

  if (isLoadingSkills) {
    return (
      <div className="text-center text-text-muted py-8">Cargando habilidades...</div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center text-text-muted py-8">
        No tienes habilidades técnicas registradas aún.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-text-muted">Total: {skills.length} habilidad(es)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill: HardSkillResponse) => (
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

            <div className="flex gap-2 mb-4 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.nivelDominio)}`}>
                {skill.nivelDominio}
              </span>
              {skill.anosExperiencia > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-text-secondary border border-white/10">
                  {skill.anosExperiencia} año{skill.anosExperiencia !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {skill.descripcion && (
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{skill.descripcion}</p>
            )}

            {skill.certificadoUrl && (
              <div className="mb-4">
                <a
                  href={skill.certificadoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-accent-neon hover:underline"
                >
                  📄 Ver certificado
                </a>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
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
