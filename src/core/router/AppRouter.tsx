import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LandingPage } from '@features/landing';
import { LoginPage, ForgotPasswordPage, CambiarPasswordPage } from '@features/login';
import { RegisterPage } from '@features/register';
import { ProfilePage } from '@/features/profile';
import { DashboardPage } from '@/features/dashboard';
//import { HardSkillPage } from '@features/HardSkills';
//          <Route path="/hardskills" element={<HardSkillPage />} />
import { SoftSkillPage } from '@features/SoftSkills';
import { HardSkillPageList } from '@features/HardSkillsList';
import { SkillsManagementPage } from '@/features/skills';
import { PhotoPage } from '@/features/photo/pages/PhotoPage';
import { ProfessionalLinksPage } from '@features/profesional-links';
import { ExperiencePage } from '@features/profile/pages/ExperiencePage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="cambiar-password" element={<CambiarPasswordPage />} />
        <Route path="Photo" element={<PhotoPage />} />
      </Route>

      {/* Protected/Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/hardskills" element={<HardSkillPageList />} />
          <Route path="/skills" element={<SkillsManagementPage />} />
          <Route path="/softskills" element={<SoftSkillPage />} />
          <Route path="/professional-links" element={<ProfessionalLinksPage />} />
        </Route>
      </Route>
    </Routes>
  );
};