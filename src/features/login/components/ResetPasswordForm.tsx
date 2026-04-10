import { useState, type FormEvent } from 'react';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useToast } from '@shared/hooks/useToast';

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (!newPassword.trim() || !confirmPassword.trim()) return;

    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }

    setIsLoading(true);

    // TODO: Backend integration
    // Send request to backend with:
    // - token/code from URL parameters
    // - newPassword
    // Example: POST /api/auth/reset-password { token, newPassword }

    await new Promise(resolve => setTimeout(resolve, 700));

    setIsLoading(false);
    setNewPassword('');
    setConfirmPassword('');

    showToast('Contraseña cambiada', 'success');

    // TODO: Backend integration
    // After successful password reset, redirect to login page
    // Example: navigate('/login')
  };

  const isPasswordsMatching = newPassword === confirmPassword && newPassword.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <Input
          label="Nueva Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />
        <Input
          label="Confirmar Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`bg-white/5 border-white/10 focus:border-brand-accent-neon/50 ${
            confirmPassword && !isPasswordsMatching ? 'border-red-500/50' : ''
          }`}
        />
        {confirmPassword && !isPasswordsMatching && (
          <p className="text-sm text-red-400">Las contraseñas no coinciden</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!newPassword.trim() || !isPasswordsMatching}
        className="w-full h-14 text-lg font-bold tracking-wide mt-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Restablecer Contraseña
      </Button>
    </form>
  );
};
