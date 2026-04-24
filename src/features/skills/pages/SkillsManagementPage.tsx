import { useState } from 'react';
import { Button } from '@shared/components/ui/Button';
import { HardSkillForm } from '@features/HardSkills/components/HardSkillForm';
import { HardSkillsList } from '@features/HardSkills/components/HardSkillsList';
import { SoftSkillForm } from '@features/skills/components/SoftSkillForm';
import { SoftSkillsList } from '@features/skills/components/SoftSkillsList';

type SkillType = 'none' | 'hard' | 'soft';

export const SkillsManagementPage = () => {
  const [addingType, setAddingType] = useState<SkillType>('none');

  return (
    <div className="relative min-h-screen bg-brand-azul-profundo/5 py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Gestión de Habilidades</h1>
          <p className="text-text-secondary">Administra tus habilidades técnicas y blandas</p>
        </div>

        {/* Add Skill Buttons */}
        <div className="mb-12 flex gap-4 flex-wrap">
          <Button
            onClick={() => setAddingType(addingType === 'hard' ? 'none' : 'hard')}
            className={`px-6 h-12 font-semibold ${
              addingType === 'hard'
                ? 'bg-brand-accent-neon text-brand-azul-profundo'
                : 'bg-white/10 hover:bg-white/20 text-text-primary'
            } transition-all`}
          >
            + Agregar Habilidad Técnica
          </Button>
          <Button
            onClick={() => setAddingType(addingType === 'soft' ? 'none' : 'soft')}
            className={`px-6 h-12 font-semibold ${
              addingType === 'soft'
                ? 'bg-brand-accent-neon text-brand-azul-profundo'
                : 'bg-white/10 hover:bg-white/20 text-text-primary'
            } transition-all`}
          >
            + Agregar Habilidad Blanda
          </Button>
        </div>

        {/* Add Forms */}
        {addingType !== 'none' && (
          <div className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
            {addingType === 'hard' && <HardSkillForm compact />}
            {addingType === 'soft' && <SoftSkillForm compact />}
          </div>
        )}

        {/* Skills Lists */}
        <div className="space-y-16">
          {/* Hard Skills Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-accent-neon mb-8">Habilidades Técnicas</h2>
            <HardSkillsList />
          </div>

          {/* Soft Skills Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-accent-neon mb-8">Habilidades Blandas</h2>
            <SoftSkillsList />
          </div>
        </div>
      </div>
    </div>
  );
};
