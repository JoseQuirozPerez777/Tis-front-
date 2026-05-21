import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

import { LandingPage } from '@features/landing';
import { LoginPage, ForgotPasswordPage, CambiarPasswordPage } from '@features/login';
import { RegisterPage } from '@features/register';
import { ProfilePage, PortafolioViewPage } from '@features/profile';
import { DashboardPage } from '@features/dashboard';

import { AcademicTrainingPage, AcademicTrainingFormPage } from '@features/AcademicTraining';
import { PhotoPage } from '@features/photo/pages/PhotoPage';
import { ProfessionalLinksPage } from '@features/profesional-links';
import { ExperiencePage } from '@features/profile/pages/ExperiencePage';
import { DashMyPerfilPage } from '@features/DashMyPerfil';

import { HabilidadesTecnicasPage } from '@features/habilidades-tecnicas/pages/HabilidadesTecnicasPage';
import { FiltrosBusquedaPage } from '@features/filtros_Busqueda';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<CambiarPasswordPage />} />
        <Route path="Photo" element={<PhotoPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/DashMyPerfil" element={<DashMyPerfilPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/experience" element={<ExperiencePage />} />

          <Route path="/skills" element={<HabilidadesTecnicasPage />} />
          <Route path="/habilidades-tecnicas" element={<HabilidadesTecnicasPage />} />

          <Route path="/buscar-portafolios" element={<FiltrosBusquedaPage />} />
          <Route path="/portafolio/:id" element={<PortafolioViewPage />} />

          <Route path="/academic-training" element={<AcademicTrainingPage />} />
          <Route path="/professional-links" element={<ProfessionalLinksPage />} />
          <Route path="/AcademicTraining" element={<AcademicTrainingPage />} />
          <Route path="/AcademicTraining/new" element={<AcademicTrainingFormPage />} />
          <Route path="/AcademicTraining/edit/:id" element={<AcademicTrainingFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
};