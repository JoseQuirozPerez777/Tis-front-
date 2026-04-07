import { useState } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { loginService } from '../services/login.service';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await loginService.login(email, password);
      showToast(`¡Bienvenido de nuevo, ${user.fullName}!`, 'success');
      // Here you would typically save the token/user and redirect
      // For now, we'll just log it
      console.log('User logged in:', user);
      setTimeout(() => {
          navigate('/profile');
        }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin
  };
};