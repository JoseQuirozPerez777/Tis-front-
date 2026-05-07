import { ProfileForm } from '../components/ProfileForm';
import { Link, useNavigate } from 'react-router-dom';
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
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

      <div className="w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <ProfileForm />
      </div>
    </div>
  );
};