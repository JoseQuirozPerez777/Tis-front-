import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type {
  HabilidadBlanda,
  HabilidadBlandaPayload,
} from "../services/habilidades-blandas.service";

interface Props {
  selected: HabilidadBlanda | null;
  onSave: (data: HabilidadBlandaPayload) => Promise<void>;
  onCancel: () => void;
}

interface FormState {
  id: number | null;
  nombre: string;
  idCategoria: number | "";
  descripcion: string;
  evidenciaUrl: string;
}

const categorias = [
  { id: 1, tipo: "TECNICA", nombre: "Desarrollo Web (Frontend/Backend)" },
  { id: 2, tipo: "TECNICA", nombre: "Bases de Datos" },
  { id: 3, tipo: "TECNICA", nombre: "Arquitectura de Software" },
  { id: 4, tipo: "TECNICA", nombre: "Seguridad Informática" },
  { id: 5, tipo: "TECNICA", nombre: "Cloud & DevOps" },
  { id: 6, tipo: "BLANDA", nombre: "Liderazgo y Gestión" },
  { id: 7, tipo: "BLANDA", nombre: "Comunicación y Oratoria" },
  { id: 8, tipo: "BLANDA", nombre: "Trabajo Colaborativo" },
  { id: 9, tipo: "BLANDA", nombre: "Resolución de Conflictos" },
  { id: 10, tipo: "BLANDA", nombre: "Productividad Personal" },
];

const emptyForm: FormState = {
  id: null,
  nombre: "",
  idCategoria: "",
  descripcion: "",
  evidenciaUrl: "",
};

export const HabilidadBlandaForm = ({ selected, onSave, onCancel }: Props) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        id: selected.id,
        nombre: selected.nombre || "",
        idCategoria: selected.categoria?.id || "",
        descripcion: selected.descripcion || "",
        evidenciaUrl: selected.evidenciaUrl || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "idCategoria"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) {
      alert("El nombre de la habilidad blanda es obligatorio");
      return;
    }

    if (!form.idCategoria) {
      alert("Debe seleccionar una categoría");
      return;
    }

    const data: HabilidadBlandaPayload = {
      nombre: form.nombre.trim(),
      idCategoria: Number(form.idCategoria),
      descripcion: form.descripcion.trim(),
      evidenciaUrl: form.evidenciaUrl.trim(),
    };

    if (form.id) {
      data.id = form.id;
    }

    try {
      setSaving(true);

      console.log("DATA HABILIDAD BLANDA ENVIADA:", data);

      await onSave(data);
      setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancel();
  };

  return (
    <div className="bg-slate-900 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-blue-300 mb-4">
        {form.id ? "Editar habilidad blanda" : "Nueva habilidad blanda"}
      </h2>

      <label className="block text-sm mb-1 text-gray-300">
        Nombre de la habilidad
      </label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Ej: Liderazgo, Comunicación, Trabajo en equipo"
        className="w-full p-2 mb-3 bg-slate-800 rounded text-white outline-none border border-slate-700"
      />

      <label className="block text-sm mb-1 text-gray-300">
        Categoría / contexto
      </label>
      <select
        name="idCategoria"
        value={form.idCategoria}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-slate-800 rounded text-white outline-none border border-slate-700"
      >
        <option value="">Seleccione una categoría</option>

        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.tipo} - {cat.nombre}
          </option>
        ))}
      </select>

      <label className="block text-sm mb-1 text-gray-300">
        Descripción
      </label>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Describe cómo demuestras esta habilidad"
        className="w-full p-2 mb-3 bg-slate-800 rounded text-white outline-none border border-slate-700 min-h-[90px]"
      />

      <label className="block text-sm mb-1 text-gray-300">
        URL de evidencia
      </label>
      <input
        name="evidenciaUrl"
        value={form.evidenciaUrl}
        onChange={handleChange}
        placeholder="https://..."
        className="w-full p-2 mb-4 bg-slate-800 rounded text-white outline-none border border-slate-700"
      />

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 p-2 rounded font-semibold"
      >
        {saving
          ? "Guardando..."
          : form.id
          ? "Actualizar habilidad"
          : "Guardar habilidad"}
      </button>

      {form.id && (
        <button
          onClick={handleCancel}
          className="w-full mt-2 bg-gray-600 hover:bg-gray-700 p-2 rounded font-semibold"
        >
          Cancelar edición
        </button>
      )}
    </div>
  );
};