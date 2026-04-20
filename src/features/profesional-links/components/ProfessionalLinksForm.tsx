import { Button } from '@shared/components/ui/Button';
import { useProfessionalLinks } from '../hooks/useProfessionalLinks';

export const ProfessionalLinksForm = () => {
  const { form, isLoading, isLoadingLinks, serverError, onSubmit, onCancel } =
    useProfessionalLinks();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4 bg-brand-azul-profundo rounded-t-[24px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#64ffda] text-[#64ffda]">
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
          <h2 className="text-xl font-bold text-[#64ffda]">Redes profesionales</h2>
          <p className="text-sm text-[#9CA3AF]">
            Agrega y gestiona los enlaces a tus redes profesionales.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-8">
        {serverError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium">
            {serverError}
          </div>
        )}

        {isLoadingLinks && (
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[#E5E7EB] text-sm">
            Cargando redes profesionales...
          </div>
        )}

        <section className="rounded-[24px] border border-white/10 bg-[#071a33]/60 p-6">
          <h3 className="text-lg font-semibold mb-2 text-[#E5E7EB]">Tus enlaces</h3>
          <p className="text-[#9CA3AF] mb-6">
            Agrega los enlaces que deseas mostrar en tu perfil.
          </p>

          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A66C2] text-white text-2xl font-bold">
                  in
                </div>

                <div>
                  <p className="text-[#E5E7EB] font-semibold">LinkedIn</p>
                  <p className="text-[#9CA3AF] text-sm">Enlace a tu perfil profesional</p>
                </div>
              </div>

              <input
                type="url"
                placeholder="https://www.linkedin.com/in/tuusuario"
                {...register('linkedin')}
                className="w-full rounded-xl border border-white/10 bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none focus:border-[#3B82F6]"
              />

              <p className="mt-2 text-xs text-[#9CA3AF]">
                Ingresa cualquier URL válida.
              </p>

              {errors.linkedin?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#111827] text-white text-lg font-bold">
                  GH
                </div>

                <div>
                  <p className="text-[#E5E7EB] font-semibold">GitHub</p>
                  <p className="text-[#9CA3AF] text-sm">Enlace a tu perfil técnico</p>
                </div>
              </div>

              <input
                type="url"
                placeholder="https://github.com/tuusuario"
                {...register('github')}
                className="w-full rounded-xl border border-white/10 bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none focus:border-[#3B82F6]"
              />

              <p className="mt-2 text-xs text-[#9CA3AF]">
                Ingresa cualquier URL válida.
              </p>

              {errors.github?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.github.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#4ADE80] text-[#4ADE80] rounded hover:bg-[#4ADE80]/10 transition-colors"
          >
            Cancelar
          </button>

          <Button
            type="submit"
            className="px-6 py-2 bg-[#3B82F6] text-white rounded hover:opacity-90 shadow-lg font-bold"
            isLoading={isLoading}
            size="lg"
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};