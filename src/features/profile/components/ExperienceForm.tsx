import type { ExperienceErrors, ExperienceFormData } from '../models/experience.model';

interface ExperienceFormProps {
  formData: ExperienceFormData;
  errors: ExperienceErrors;
  saving: boolean;
  onChange: (field: keyof ExperienceFormData, value: string | boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ExperienceForm = ({
  formData,
  errors,
  saving,
  onChange,
  onSubmit,
  onCancel,
}: ExperienceFormProps) => {
  return (
    <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 shadow-xl">
      <h2 className="mb-5 text-2xl font-bold text-[#E5E7EB]">
        Agregar experiencia laboral
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Empresa *
          </label>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => onChange('empresa', e.target.value)}
            placeholder="Ej. Google, Microsoft"
            className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
          />
          {errors.empresa && (
            <p className="mt-1 text-sm text-rose-400">{errors.empresa}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Cargo *
          </label>
          <input
            type="text"
            value={formData.cargo}
            onChange={(e) => onChange('cargo', e.target.value)}
            placeholder="Ej. Desarrollador Frontend"
            className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
          />
          {errors.cargo && (
            <p className="mt-1 text-sm text-rose-400">{errors.cargo}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Período de inicio *
          </label>
          <input
            type="month"
            value={formData.fechaInicio}
            onChange={(e) => onChange('fechaInicio', e.target.value)}
            className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
          />
          {errors.fechaInicio && (
            <p className="mt-1 text-sm text-rose-400">{errors.fechaInicio}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Período de fin *
          </label>
          <input
            type="month"
            value={formData.fechaFin}
            onChange={(e) => onChange('fechaFin', e.target.value)}
            disabled={formData.esTrabajoActual}
            className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
          />
          {errors.fechaFin && (
            <p className="mt-1 text-sm text-rose-400">{errors.fechaFin}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm text-[#E5E7EB]">
          <input
            type="checkbox"
            checked={formData.esTrabajoActual}
            onChange={(e) => onChange('esTrabajoActual', e.target.checked)}
            className="h-4 w-4 accent-[#3B82F6]"
          />
          Actualmente trabajo aquí
        </label>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
          Descripción *
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
          placeholder="Describe tus funciones, responsabilidades o logros"
          rows={5}
          className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
        />
        {errors.descripcion && (
          <p className="mt-1 text-sm text-rose-400">{errors.descripcion}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
  <button
    type="button"
    onClick={onCancel}
    disabled={saving}
    className="rounded-xl border border-[#1E3A5F] bg-transparent px-5 py-3 font-medium text-[#E5E7EB] transition hover:bg-[#1E3A5F]/30 disabled:cursor-not-allowed disabled:opacity-70"
  >
    Cancelar
  </button>

  <button
    type="button"
    onClick={onSubmit}
    disabled={saving}
    className="rounded-xl bg-[#3B82F6] px-5 py-3 font-medium text-white transition hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
  >
    {saving ? 'Guardando...' : 'Guardar experiencia'}
  </button>
</div>
    </div>
  );
};

export default ExperienceForm;