import { ProfileForm } from '../components/ProfileForm';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-100px)] py-8 px-4 max-w-5xl mx-auto flex flex-col gap-8">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-azul-brillante/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-morado/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold text-text-primary">Mi Perfil</h1>
        <p className="text-text-secondary mt-2">
          Gestiona tu información personal, habilidades y proyectos desde aquí.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        <Link to="/hardskills" className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-brand-morado/50 transition-colors group flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-morado/10 rounded-xl flex items-center justify-center text-brand-morado group-hover:scale-110 transition-transform shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Mis Habilidades</h3>
            <p className="text-text-secondary text-sm">Gestiona tus habilidades duras y blandas</p>
          </div>
        </Link>

        <Link to="/projects" className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-[#10B981]/50 transition-colors group flex items-center gap-4">
          <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Mis Proyectos</h3>
            <p className="text-text-secondary text-sm">Administra tus portafolios y proyectos</p>
          </div>
        </Link>
      </div>

      <div className="w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <ProfileForm />
      </div>
    </div>
  );
};