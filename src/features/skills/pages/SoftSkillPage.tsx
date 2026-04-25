import { SoftSkillForm } from '../components/SoftSkillForm';
import { SoftSkillsList } from '../components/SoftSkillsList';

export const SoftSkillPage = () => {
  return (
    <div className="relative min-h-screen bg-brand-azul-profundo/5 py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="relative z-10 px-4">
        {/* Formulario */}
        <div className="mb-16">
          <SoftSkillForm />
        </div>

        {/* Lista de habilidades */}
        <div className="mt-12">
          <SoftSkillsList />
        </div>
      </div>
    </div>
  );
};
