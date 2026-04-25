import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../utils/validation';
import type { ProfileFormData } from '../utils/validation';
import { profileService } from '../services/profile.service';
import { profileAdapter } from '../services/profile.adapter';
import { useToast } from '@shared/hooks/useToast';

const storedProfile = profileService.getProfile();

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { showToast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: storedProfile?.fullName || 'Juan Pérez',
      profession: storedProfile?.profession || '',
      bio: storedProfile?.bio || '',
    },
    mode: 'onTouched'
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const dto = profileAdapter(data);

      const response = await profileService.updateProfile(dto);

      if (response.success) {
        showToast(response.message, 'success');
      } else {
        setServerError(response.message);
        showToast(response.message, 'error');
      }
    } catch {
      const msg = 'Ocurrió un error inesperado. Por favor intenta de nuevo.';
      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    form.reset({
      fullName: storedProfile?.fullName || 'Juan Pérez',
      profession: storedProfile?.profession || '',
      bio: storedProfile?.bio || '',
    });

    setServerError(null);
  };

  return {
    form,
    isLoading,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
    onCancel,
  };
};