import { useState,useEffect } from 'react';
import { Button } from '@shared/components/ui/Button';
import { HardSkillForm } from '@features/HardSkills/components/HardSkillForm';
import { HardSkillsList } from '@features/HardSkills/components/HardSkillsList';
import { SoftSkillForm } from '@features/skills/components/SoftSkillForm';
import { SoftSkillsList } from '@features/skills/components/SoftSkillsList';
import type { HardSkillResponse } from '@features/HardSkills/models/hardSkill.model';
import type { SoftSkillResponse } from '@features/skills/models/softSkill.model';

type SkillType = 'none' | 'hard' | 'soft';

export const SkillsManagementPage = () => {
  const [addingType, setAddingType] = useState<SkillType>('none');
  const [editingHardSkill, setEditingHardSkill] = useState<HardSkillResponse | null>(null);
  const [editingSoftSkill, setEditingSoftSkill] = useState<SoftSkillResponse | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleSkillSaved = () => {
      setAddingType('none');
      setEditingHardSkill(null);
      setEditingSoftSkill(null);
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener('hard-skill-saved', handleSkillSaved);
    window.addEventListener('soft-skill-saved', handleSkillSaved);

    return () => {
      window.removeEventListener('hard-skill-saved', handleSkillSaved);
      window.removeEventListener('soft-skill-saved', handleSkillSaved);
    };
  }, []);

  const handleAddHard = () => {
    setEditingHardSkill(null);
    setEditingSoftSkill(null);
    setAddingType(addingType === 'hard' ? 'none' : 'hard');
  };

  const handleAddSoft = () => {
    setEditingHardSkill(null);
    setEditingSoftSkill(null);
    setAddingType(addingType === 'soft' ? 'none' : 'soft');
  };

  const handleEditHard = (skill: HardSkillResponse) => {
    setEditingHardSkill(skill);
    setEditingSoftSkill(null);
    setAddingType('hard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditSoft = (skill: SoftSkillResponse) => {
    setEditingSoftSkill(skill);
    setEditingHardSkill(null);
    setAddingType('soft');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingHardSkill(null);
    setEditingSoftSkill(null);
    setAddingType('none');
  };

  return (
    <div className="relative min-h-screen bg-brand-azul-profundo/5 py-12 overflow-hidden">
      <div className="absolute top-1/4 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Gestión de Habilidades</h1>
          <p className="text-text-secondary">Administra tus habilidades técnicas y blandas</p>
        </div>

        <div className="mb-12 flex gap-4 flex-wrap">
          <Button
            onClick={handleAddHard}
            className={`px-6 h-12 font-semibold ${
              addingType === 'hard'
                ? 'bg-brand-accent-neon text-brand-azul-profundo'
                : 'bg-white/10 hover:bg-white/20 text-text-primary'
            } transition-all`}
          >
            + Agregar Habilidad Técnica
          </Button>

          <Button
            onClick={handleAddSoft}
            className={`px-6 h-12 font-semibold ${
              addingType === 'soft'
                ? 'bg-brand-accent-neon text-brand-azul-profundo'
                : 'bg-white/10 hover:bg-white/20 text-text-primary'
            } transition-all`}
          >
            + Agregar Habilidad Blanda
          </Button>
        </div>

        {addingType !== 'none' && (
          <div className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-red-500/20 text-text-secondary hover:text-red-300 border border-white/10 transition-all flex items-center justify-center text-xl font-bold"
              title="Cerrar formulario"
            >
             ×
           </button>
            {addingType === 'hard' && (
              <HardSkillForm
                compact
                editingSkill={editingHardSkill}
                onCancelEdit={handleCancelEdit}
              />
            )}

            {addingType === 'soft' && (
              <SoftSkillForm
                compact
                editingSkill={editingSoftSkill}
                onCancelEdit={handleCancelEdit}
              />
            )}
          </div>
        )}

        <div className="space-y-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-accent-neon mb-8">
              Habilidades Técnicas
            </h2>
            <HardSkillsList 
            key={`hard-${refreshKey}`}
            onEditSkill={handleEditHard} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-accent-neon mb-8">
              Habilidades Blandas
            </h2>
            <SoftSkillsList 
            key={`soft-${refreshKey}`}
            onEditSkill={handleEditSoft} />
          </div>
        </div>
      </div>
    </div>
  );
};