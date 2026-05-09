import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LandingPage } from '@features/landing';
import { LoginPage, ForgotPasswordPage, CambiarPasswordPage, ChangePasswordPage } from '@features/login';
import { RegisterPage } from '@features/register';
import { ProfilePage } from '@/features/profile';
import { DashboardPage } from '@/features/dashboard';

import { SoftSkillPage } from '@features/SoftSkills';
import { HardSkillPage } from '@features/HardSkills/pages/HardSkillsPage';
import { SkillsManagementPage } from '@/features/skills';
import { AcademicTrainingPage } from '@features/AcademicTraining';
import { PhotoPage } from '@/features/photo/pages/PhotoPage';
import { ProfessionalLinksPage } from '@features/profesional-links';
import { ExperiencePage } from '@features/profile/pages/ExperiencePage';
import { DashMyPerfilPage } from '@features/DashMyPerfil';
import { FiltrosBusquedaPage } from '@features/filtros_Busqueda/pages/FiltrosBusquedaPage';
import { ProjectsPage } from '@features/projects/pages/ProjectsPage';



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
          <Route path="/HardSkills" element={<HardSkillPage />} />
          <Route path="/skills" element={<SkillsManagementPage />} />
          <Route path="/softskills" element={<SoftSkillPage />} />
          <Route path="/academic-training" element={<AcademicTrainingPage />} />
          <Route path="/professional-links" element={<ProfessionalLinksPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/buscar-portafolios" element={<FiltrosBusquedaPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

        </Route>
      </Route>
    </Routes>
  );
};