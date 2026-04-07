interface MensajeEstadoUsuarioProps {
  tipo: 'success' | 'error';
  texto: string;
  onCerrar: () => void;
}

const MensajeEstadoUsuario = ({
  tipo,
  texto,
  onCerrar,
}: MensajeEstadoUsuarioProps) => {
  return (
    <div
      className={`fixed right-4 top-4 z-[60] flex max-w-sm items-start justify-between gap-4 rounded-xl border px-4 py-3 shadow-2xl ${
        tipo === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
          : 'border-rose-500/30 bg-rose-500/15 text-rose-200'
      }`}
    >
      <p className="text-sm font-medium">{texto}</p>

      <button
        onClick={onCerrar}
        className="text-lg font-bold leading-none opacity-80 transition hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};

export default MensajeEstadoUsuario;