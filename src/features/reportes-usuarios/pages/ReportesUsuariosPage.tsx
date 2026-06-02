import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Lock } from 'lucide-react';

import { ReportesUsuariosFilters } from '../components/ReportesUsuariosFilters';
import { ReportesUsuariosStats } from '../components/ReportesUsuariosStats';
import { ReportesUsuariosTable } from '../components/ReportesUsuariosTable';
import { useReportesUsuarios } from '../hooks/useReportesUsuarios';

export const ReportesUsuariosPage = () => {
  const {
  filtrosFormulario,
  setFiltrosFormulario,
  usuarios,
  totalUsuarios,
  usuariosActivos,
  usuariosInactivos,
  cargando,
  error,
  aplicarFiltros,
  limpiarFiltros,
} = useReportesUsuarios();

  const exportarPdf = async () => {
    const elemento = document.getElementById('reporte-usuarios-pdf');

    if (!elemento) {
      alert('No se encontró el contenido para exportar.');
      return;
    }

    try {
      const canvas = await html2canvas(elemento, {
        scale: 2,
        backgroundColor: '#020817',
      });

      const imagen = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const anchoPdf = pdf.internal.pageSize.getWidth();
      const altoPdf = (canvas.height * anchoPdf) / canvas.width;

      pdf.addImage(imagen, 'PNG', 0, 0, anchoPdf, altoPdf);
      pdf.save('reporte-usuarios.pdf');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al exportar el reporte en PDF.');
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] px-6 py-8 text-white">
      <section id="reporte-usuarios-pdf" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Reportes de Usuarios
            </h1>

            <p className="mt-2 max-w-3xl text-slate-400">
              Consulta la información general de los usuarios registrados y
              analiza su estado dentro del sistema.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            <Lock size={16} />
            Acceso solo para administradores
          </div>
        </div>

        <ReportesUsuariosStats
          totalUsuarios={totalUsuarios}
          usuariosActivos={usuariosActivos}
          usuariosInactivos={usuariosInactivos}
        />

        <ReportesUsuariosFilters
          filtros={filtrosFormulario}
          setFiltros={setFiltrosFormulario}
          aplicarFiltros={aplicarFiltros}
          limpiarFiltros={limpiarFiltros}
          exportarPdf={exportarPdf}
        />

        <ReportesUsuariosTable
  usuarios={usuarios}
  cargando={cargando}
  error={error}
/>
      </section>
    </main>
  );
};