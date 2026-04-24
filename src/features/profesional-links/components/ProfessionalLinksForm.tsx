import { useProfessionalLinks } from '../hooks/useProfessionalLinks';
import type { RedSocialResponseDTO } from '../services/professional-links.dto';
interface Props {
  selectedLink: RedSocialResponseDTO | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ProfessionalLinksForm =( {
  selectedLink,
  onCancel,
  onSuccess,
}: Props) => {
  const { 
    form, 
    isLoading, 
    isLoadingLinks, 
    serverError, 
    onSubmit, } =
    useProfessionalLinks(selectedLink, onSuccess);
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const selectedNetwork = watch('nombreRed') || 'LinkedIn';
  const isLinkedIn = selectedNetwork === 'LinkedIn';

  return (
    <div className="w-full text-white">

      <div className="rounded-[28px] border border-[#163154] bg-[#061A31] shadow-lg">
        <div className="border-b border-[#163154] px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#23E7C8] text-[#23E7C8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#23E7C8] md:text-4xl">
                Redes profesionales
              </h1>
              <p className="mt-1 text-sm text-[#C3CBD8] md:text-base">
                Agrega tus perfiles profesionales para que otros puedan conocer más sobre ti.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-8">
          {serverError && (
            <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {serverError}
            </div>
          )}

          {isLoadingLinks && (
            <div className="mb-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB]">
              Cargando redes profesionales...
            </div>
          )}

          <section className="rounded-[22px] border border-[#163154] bg-[#0A2240] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#F3F4F6]">Tus enlaces</h2>
            <p className="mt-2 text-sm text-[#9CA3AF] md:text-base">
              Agrega y gestiona los enlaces a tus redes profesionales.
            </p>

            <div className="mt-8">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-md ${
                    isLinkedIn ? 'bg-[#0A66C2]' : 'bg-[#111827]'
                  }`}
                >
                  {isLinkedIn ? (
                    <span className="text-2xl font-bold">in</span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.36 22.94c.58.1.79-.25.79-.56v-2.17c-3.2.69-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.19 1.17A11.1 11.1 0 0112 6.1c.98 0 1.97.13 2.9.38 2.22-1.49 3.19-1.17 3.19-1.17.63 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                  )}
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white">
                    {selectedNetwork}
                  </p>
                  <p className="text-base text-[#C3CBD8]">
                    Enlace a tu perfil profesional
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Tipo de red <span className="text-red-400">*</span>
                  </label>

                  <select
                    {...register('nombreRed')}
                    className="w-full rounded-xl border border-[#2563EB] bg-[#071A30] px-4 py-4 text-white outline-none focus:border-[#3B82F6]"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                  </select>

                  {errors.nombreRed?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {String(errors.nombreRed.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    URL del perfil <span className="text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B8C1D1]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </span>

                    <input
                      type="url"
                      placeholder={
                        isLinkedIn
                          ? 'https://www.linkedin.com/in/juanperez'
                          : 'https://github.com/juanperez'
                      }
                      {...register('urlPerfil')}
                      className="w-full rounded-xl border border-[#2563EB] bg-[#071A30] py-4 pl-11 pr-4 text-white outline-none placeholder:text-[#AEB7C6] focus:border-[#3B82F6]"
                    />
                  </div>

                  {errors.urlPerfil?.message ? (
                    <p className="mt-2 text-sm text-red-400">
                      {String(errors.urlPerfil.message)}
                    </p>
                  ) : (
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#AEB7C6]">
                      <span>ⓘ</span>
                      <span>
                        {isLinkedIn
                          ? 'Ingresa cualquier URL válida de LinkedIn.'
                          : 'Ingresa cualquier URL válida de GitHub.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#163154] pt-6">
              <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                
            <button
              type="button"
              onClick={onCancel}   // ⭐ AHORA FUNCIONA
              className="rounded-xl bg-[#173255] px-8 py-3"
            >
              Cancelar
            </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
                    isLoading
                      ? 'cursor-not-allowed bg-gray-500 opacity-70'
                      : 'bg-[#43C77A] hover:bg-[#38b56b]'
                  }`}
                >
                  {isLoading ? 'Guardando...' : 'Guardar enlace'}
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
  //bueno
};