import { useProfile } from '../hooks/useProfile';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useEffect, useState } from 'react';
import { profileService } from '../services/profile.service';
interface Profesion {
  idProfesion: number;
  nombreProfesion: string;
}


export const ProfileForm = () => {
  const { form, isLoading, serverError, onSubmit, onCancel } = useProfile();
  const {
    register,
    formState: { errors },
  } = form;

  const [profesiones, setProfesiones] = useState<Profesion[]>([]);
  const [loadingProfesiones, setLoadingProfesiones] = useState(false);

  useEffect(() => {
    const cargarProfesiones = async () => {
      try {
        setLoadingProfesiones(true);

        const data = await profileService.getProfesiones();
        setProfesiones(data);
      } catch (error) {
        console.error('Error al cargar profesiones:', error);
      } finally {
        setLoadingProfesiones(false);
      }
    };

    cargarProfesiones();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#112240] rounded-lg shadow-xl border border-[#233554] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#233554] flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#64ffda]">Configuración del Perfil</h2>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-8">
        {serverError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium animate-shake">
            {serverError}
          </div>
        )}

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-[#ccd6f6]">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Información Básica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre Completo"
              placeholder="Juan Pérez"
              {...register('fullName')}
              error={errors.fullName?.message}
              autoComplete="name"
              className="bg-[#0a192f] border-[#233554] focus:border-[#64ffda] text-[#ccd6f6]"
            />

            <div>
              <label className="block text-sm text-[#8892b0] mb-2">
                Profesión / Título
              </label>
              <select
                {...register('profession')}
                className="w-full bg-[#0a192f] border border-[#233554] rounded px-4 py-2 focus:border-[#64ffda] outline-none text-[#ccd6f6]"
                disabled={loadingProfesiones}
              >
                <option value="">
                  {loadingProfesiones ? 'Cargando profesiones...' : 'Selecciona una opción'}
                </option>

                {profesiones.map((profesion) => (
                  <option key={profesion.idProfesion} value={profesion.idProfesion}>
                    {profesion.nombreProfesion}
                  </option>
                ))}
              </select>

              {errors.profession?.message && (
                <p className="mt-2 text-sm text-red-400">{errors.profession.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-[#8892b0] mb-2">
                Biografía Profesional
              </label>
              <textarea
                rows={4}
                placeholder="Describe tu experiencia y metas..."
                {...register('bio')}
                className="w-full bg-[#0a192f] border border-[#233554] rounded px-4 py-2 focus:border-[#64ffda] outline-none text-[#ccd6f6] resize-none"
              />
              {errors.bio?.message && (
                <p className="mt-2 text-sm text-red-400">{errors.bio.message}</p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4 pt-4 border-t border-[#233554]">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors"
          >
            Cancelar
          </button>

          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-lg font-bold"
            isLoading={isLoading}
            size="lg"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};