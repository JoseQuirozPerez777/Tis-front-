import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@shared/hooks/useToast';
import { professionalLinksService } from '../services/professional-links.service';
import {
  professionalLinksSchema,
  type ProfessionalLinksFormData,
} from '../utils/validation';

export const useProfessionalLinks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [storedLinks, setStoredLinks] = useState<ProfessionalLinksFormData>({
    linkedin: '',
    github: '',
  });

  const { showToast } = useToast();

  const form = useForm<ProfessionalLinksFormData>({
    resolver: zodResolver(professionalLinksSchema),
    defaultValues: {
      linkedin: '',
      github: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    const loadLinks = async () => {
      try {
        setIsLoadingLinks(true);
        setServerError(null);

        const data = await professionalLinksService.getProfessionalLinks();

        const normalized = {
          linkedin: data.linkedin ?? '',
          github: data.github ?? '',
        };

        setStoredLinks(normalized);
        form.reset(normalized);
      } catch (error) {
        console.error('Error al cargar redes profesionales:', error);
        setServerError('No se pudieron cargar tus redes profesionales.');
      } finally {
        setIsLoadingLinks(false);
      }
    };

    loadLinks();
  }, [form]);

  const onSubmit = async (data: ProfessionalLinksFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const payload = {
        linkedin: data.linkedin?.trim() || '',
        github: data.github?.trim() || '',
      };

      const response = await professionalLinksService.saveProfessionalLinks(
        payload,
        true
      );

      setStoredLinks(payload);

      showToast(
        response.message || 'Redes profesionales actualizadas correctamente.',
        'success'
      );
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Intenta de nuevo.';
      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    form.reset(storedLinks);
    setServerError(null);
  };

  return {
    form,
    isLoading,
    isLoadingLinks,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
    onCancel,
  };
};