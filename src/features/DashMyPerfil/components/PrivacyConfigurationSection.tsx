import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Loader2, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { dashMyPerfilService } from '../services/privacy.service';

interface PrivacyConfigurationSectionProps {
  onBack: () => void;
}

const SECTIONS: Record<string, string[]> = {
  "Información Personal": ["nombre", "foto", "profesion", "biografia", "enlacePublico"],
  "Información de Contacto": ["correo", "telefono", "direccion", "redesSociales"],
  "Experiencia Laboral": ["experienciasLaborales"],
  "Formación Académica": ["formacionesAcademica"],
  "Habilidades Técnicas": ["habilidadesTecnicas"],
  "Habilidades Blandas": ["habilidadesBlandas"],
  "Proyectos": ["proyectos"],
  "Evidencias y Certificaciones": ["evidencias"],
};


const getInitialVisibility = (value: unknown, prefix = ''): Record<string, boolean> => {
  const visibility: Record<string, boolean> = {};

  if (value === null || typeof value !== 'object') {
    if (prefix) {
      visibility[prefix] = true;
    }
    return visibility;
  }

  if (Array.isArray(value)) {
    if (prefix) {
      visibility[prefix] = true;
    }
    value.forEach((item, index) => {
      Object.assign(visibility, getInitialVisibility(item, `${prefix}[${index}]`));
    });
    return visibility;
  }

  Object.entries(value).forEach(([key, item]) => {
    const propertyPath = prefix ? `${prefix}.${key}` : key;
    visibility[propertyPath] = true;
    Object.assign(visibility, getInitialVisibility(item, propertyPath));
  });

  return visibility;
};

const renderValue = (value: unknown): string => {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'object') return '';
  return String(value);
};

const isScalar = (value: unknown) =>
  value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

export const PrivacyConfigurationSection = ({ onBack }: PrivacyConfigurationSectionProps) => {
  const [portfolioData, setPortfolioData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await dashMyPerfilService.getPortfolioSummary();
        setPortfolioData(data as Record<string, unknown>);
        setVisibility(getInitialVisibility(data, ''));
      } catch (err) {
        console.error('Error al cargar resumen de portafolio:', err);
        setError('No se pudo obtener el resumen del backend. Verifica tu sesión y conexión.');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const handleToggleVisibility = (key: string) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApplyChanges = () => {
    setAppliedMessage('Los cambios se han aplicado en la interfaz.');
    setTimeout(() => setAppliedMessage(null), 2500);
  };

  const renderData = (value: unknown, key: string, path: string) => {
    const visible = visibility[path] ?? true;

    if (isScalar(value)) {
      return (
        <li
          key={path}
          className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl border border-card-border bg-card-bg/60"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">{key}</p>
            <p className="text-sm text-text-secondary truncate">
              {visible ? renderValue(value) : '•••••• Oculto'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggleVisibility(path)}
            className="text-brand-azul-brillante hover:text-brand-azul-brillante/80"
            aria-label={visible ? `Ocultar ${key}` : `Mostrar ${key}`}
          >
            {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </li>
      );
    }

    if (Array.isArray(value)) {
      return (
        <li key={path} className="space-y-3 p-4 rounded-3xl border border-card-border bg-card-bg/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">{key}</p>
              <p className="text-sm text-text-secondary">{value.length} elemento{value.length === 1 ? '' : 's'}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleVisibility(path)}
              className="text-brand-azul-brillante hover:text-brand-azul-brillante/80"
              aria-label={visible ? `Ocultar ${key}` : `Mostrar ${key}`}
            >
              {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          {visible ? (
            <ul className="space-y-3 pl-4 border-l border-card-border/50">
              {value.map((item, index) =>
                renderData(item, `${key}[${index}]`, `${path}[${index}]`)
              )}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary italic">Contenido oculto</p>
          )}
        </li>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <li key={path} className="space-y-3 p-4 rounded-3xl border border-card-border bg-card-bg/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">{key}</p>
              <p className="text-sm text-text-secondary">Objeto con {Object.keys(value).length} campo{Object.keys(value).length === 1 ? '' : 's'}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleVisibility(path)}
              className="text-brand-azul-brillante hover:text-brand-azul-brillante/80"
              aria-label={visible ? `Ocultar ${key}` : `Mostrar ${key}`}
            >
              {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          {visible ? (
            <ul className="space-y-3 pl-4 border-l border-card-border/50">
              {Object.entries(value).map(([childKey, childValue]) =>
                renderData(childValue, childKey, `${path ? `${path}.` : ''}${childKey}`)
              )}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary italic">Contenido oculto</p>
          )}
        </li>
      );
    }

    return null;
  };

const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

const handleToggleSection = (section: string) => {
  setOpenSections((prev) => ({
    ...prev,
    [section]: !prev[section],
  }));
};

  
const renderedSections = useMemo(() => {
  if (!portfolioData) return null;

  return Object.entries(SECTIONS).map(([sectionTitle, keys]) => {
    let filteredKeys = keys;

    // Excluir campos en Información Personal
    if (sectionTitle === "Información Personal") {
      filteredKeys = keys.filter(
        (key) => key !== "foto" && key !== "enlacePublico"
      );
    }
    const sectionFields = filteredKeys
      .filter((key) => portfolioData[key] !== undefined)
      .map((key) => renderData(portfolioData[key], key, key));

    if (sectionFields.length === 0) return null;

    const isOpen = openSections[sectionTitle] ?? false;
    const alwaysOpen = sectionTitle === "Información Personal";

    return (
      <div key={sectionTitle} className="space-y-4 rounded-2xl border border-card-border bg-card-bg/40 p-4">
        <button
          type="button"
          onClick={() => !alwaysOpen && handleToggleSection(sectionTitle)}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-xl font-bold text-text-primary">{sectionTitle}</h2>
          {!alwaysOpen && (
            <span className="text-sm text-text-secondary">
              {isOpen ? "Ocultar" : "Mostrar"}
            </span>
          )}
        </button>
        {(alwaysOpen || isOpen) && (
          <ul className="space-y-4 pl-2">{sectionFields}</ul>
        )}
      </div>
    );
  });
}, [portfolioData, visibility, openSections]);


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">CONFIGURACIÓN DE PRIVACIDAD</h1>
          <p className="text-text-secondary mt-1">
            Visualiza los datos y oculta el dato que no quieres que se vea en perfil publico.
          </p>
          <p className="text-text-secondary mt-1">
            Con el icono de ojo puedes ocultar o mostrar. Recuerda aplicar los cambios para que se reflejen en tu perfil público.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-card-bg"
        >
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-azul-brillante animate-spin mb-4" />
          <p className="text-text-secondary">Cargando configuración de privacidad...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-text-primary">Error al cargar los datos</p>
              <p className="text-text-secondary mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="rounded-[32px] border border-card-border bg-card-bg/50 p-4">
              <p className="text-sm text-text-secondary">Haz clic en el icono para ocultar o mostrar cada campo.</p>
            </div>
            <ul className="space-y-8">{renderedSections}</ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleApplyChanges}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-azul-brillante px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-azul-brillante/90"
            >
              Aplicar cambios
            </button>
            {appliedMessage && (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> {appliedMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
