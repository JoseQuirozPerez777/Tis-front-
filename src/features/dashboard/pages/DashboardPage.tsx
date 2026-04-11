import React from 'react';
import { useAuth } from '@/core/context/AuthContext';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            ¡Hola, {user?.fullName?.split(' ')[0] || 'Usuario'}! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Bienvenido a tu panel de control de Portafolios TIS.
          </p>
        </div>

      </div>

      {/* Stats/Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Card 1 */}
        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group">
          <div className="w-12 h-12 bg-brand-azul-brillante/10 rounded-xl flex items-center justify-center text-brand-azul-brillante mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Tu Perfil</h3>
          <p className="text-text-secondary text-sm mb-4">
            Mantén tu información personal y de contacto actualizada para destacar en tu portafolio.
          </p>
          <Link to="/profile" className="text-brand-azul-brillante font-medium text-sm hover:underline flex items-center gap-1">
            Revisar perfil
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-morado/50 transition-colors group">
          <div className="w-12 h-12 bg-brand-morado/10 rounded-xl flex items-center justify-center text-brand-morado mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Habilidades</h3>
          <p className="text-text-secondary text-sm mb-4">
            Añade y organiza tus habilidades técnicas y blandas para mostrar tu especialidad.
          </p>
          <Link to="/skills" className="text-brand-morado font-medium text-sm hover:underline flex items-center gap-1">
            Gestionar habilidades
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
          <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981] mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Proyectos</h3>
          <p className="text-text-secondary text-sm mb-4">
            Muestra tus mejores trabajos. Crea y conecta repositorios o describe tus casos de éxito.
          </p>
          <Link to="/projects" className="text-[#10B981] font-medium text-sm hover:underline flex items-center gap-1">
            Ir a proyectos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
