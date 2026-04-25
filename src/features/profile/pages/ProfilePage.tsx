import { ProfileForm } from '../components/ProfileForm';
import { Link,useNavigate } from 'react-router-dom';
import { ProfessionalLinksPage } from '../../profesional-links/pages/ProfessionalLinksPage';
import { useProfilePhoto } from "../../photo/hooks/useProfilePhoto";

export const ProfilePage = () => {

   const navigate = useNavigate();

  const { previewUrl, isLoadingPerfil } = useProfilePhoto();
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

    {/* ================= HERO PERFIL ================= */}
      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border 
      rounded-2xl md:rounded-3xl 
      p-5 sm:p-6 md:p-8 
      shadow-xl">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">

          {/* FOTO PERFIL */}
          <Link to="/photo" className="relative group mx-auto md:mx-0">
            <div className="
              w-28 h-28 
              sm:w-32 sm:h-32 
              md:w-36 md:h-36 
              rounded-2xl overflow-hidden border-4 border-brand-morado/40 shadow-lg bg-[#0F223D] flex items-center justify-center">

              {isLoadingPerfil ? (
                <span className="text-white text-sm">Cargando...</span>
              ) : previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"/>
                </svg>
              )}
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                Cambiar foto
              </span>
            </div>
          </Link>

          {/* DATOS PERFIL */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Usuario
            </h1>

            <p className="text-base sm:text-lg text-brand-morado mt-1">
              profesion
            </p>

            <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-xl mx-auto md:mx-0">
              biografía
            </p>
          </div>

          {/* BOTON EDITAR */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <button
              onClick={() => navigate("/profile")}
              className="bg-brand-azul-brillante hover:opacity-90 text-white 
              w-full md:w-auto 
              px-5 sm:px-6 py-3 
              rounded-xl shadow-lg whitespace-nowrap">
              Editar perfil
            </button>
          </div>

        </div>
      </section>

            {/* ================= profesional-link ================= */}
      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border 
      rounded-2xl md:rounded-3xl 
      p-5 sm:p-6 md:p-8 
      shadow-xl">

      <div className="w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <ProfessionalLinksPage />
      </div>

      </section>


      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        <Link to="/hardskills" className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-brand-morado/50 transition-colors group flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-morado/10 rounded-xl flex items-center justify-center text-brand-morado group-hover:scale-110 transition-transform shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Skills Técnicos</h3>
            <p className="text-text-secondary text-sm">Gestiona tus habilidades duras</p>
          </div>
        </Link>
        
        <Link to="/softskills" className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-azul-brillante/10 rounded-xl flex items-center justify-center text-brand-azul-brillante group-hover:scale-110 transition-transform shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Skills Blandos</h3>
            <p className="text-text-secondary text-sm">Gestiona tus habilidades interpersonales</p>
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