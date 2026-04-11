import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { LandingPage } from '@features/landing';
import { LoginPage } from '@features/login';
import { RegisterPage } from '@features/register';
import { ProfilePage } from '@/features/profile';
import { PhotoPage } from '@/features/photo/pages/PhotoPage';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="Photo" element={<PhotoPage />} />
      </Route>
    </Routes>
  );
};
