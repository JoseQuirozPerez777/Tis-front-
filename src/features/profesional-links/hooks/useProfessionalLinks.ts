import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@shared/hooks/useToast';
import { professionalLinksService } from '../services/professional-links.service';
import {
  professionalLinksSchema,
  type ProfessionalLinksFormData,
} from '../utils/validation';

type ProfessionalLinksIds = {
  linkedinId?: number;
  githubId?: number;
};

export const useProfessionalLinks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [storedLinks, setStoredLinks] = useState<ProfessionalLinksFormData>({
    linkedin: '',
    linkedinPublic: true,
    github: '',
    githubPublic: true,
  });

  const [linkIds, setLinkIds] = useState<ProfessionalLinksIds>({});

  const { showToast } = useToast();

  const form = useForm<ProfessionalLinksFormData>({
    resolver: zodResolver(professionalLinksSchema),
    defaultValues: {
      linkedin: '',
      linkedinPublic: true,
      github: '',
      githubPublic: true,
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    const loadLinks = async () => {
      try {
        setIsLoadingLinks(true);
        setServerError(null);

        const response = await professionalLinksService.getProfessionalLinks();
        const links = response.data ?? [];

        const linkedin = links.find(
          (item) => item.nombreRed === 'LinkedIn'
        );
        const github = links.find(
          (item) => item.nombreRed === 'GitHub'
        );

        const normalized: ProfessionalLinksFormData = {
          linkedin: linkedin?.urlPerfil ?? '',
          linkedinPublic: linkedin?.esPublico ?? true,
          github: github?.urlPerfil ?? '',
          githubPublic: github?.esPublico ?? true,
        };

        setLinkIds({
          linkedinId: linkedin?.idRed,
          githubId: github?.idRed,
        });

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
      const linkedinUrl = data.linkedin?.trim() || '';
      const githubUrl = data.github?.trim() || '';

      const creates: Array<{
        nombreRed: string;
        urlPerfil: string;
        esPublico: boolean;
      }> = [];

      const updates: Promise<unknown>[] = [];

      // LinkedIn
      if (linkedinUrl) {
        if (linkIds.linkedinId) {
          updates.push(
            professionalLinksService.updateProfessionalLink(linkIds.linkedinId, {
              nombreRed: 'LinkedIn',
              urlPerfil: linkedinUrl,
              esPublico: data.linkedinPublic,
            })
          );
        } else {
          creates.push({
            nombreRed: 'LinkedIn',
            urlPerfil: linkedinUrl,
            esPublico: data.linkedinPublic,
          });
        }
      }

      // GitHub
      if (githubUrl) {
        if (linkIds.githubId) {
          updates.push(
            professionalLinksService.updateProfessionalLink(linkIds.githubId, {
              nombreRed: 'GitHub',
              urlPerfil: githubUrl,
              esPublico: data.githubPublic,
            })
          );
        } else {
          creates.push({
            nombreRed: 'GitHub',
            urlPerfil: githubUrl,
            esPublico: data.githubPublic,
          });
        }
      }

      if (creates.length > 0) {
        await professionalLinksService.createProfessionalLinks(creates);
      }

      if (updates.length > 0) {
        await Promise.all(updates);
      }

      const refreshed = await professionalLinksService.getProfessionalLinks();
      const links = refreshed.data ?? [];

      const linkedin = links.find((item) => item.nombreRed === 'LinkedIn');
      const github = links.find((item) => item.nombreRed === 'GitHub');

      const normalized: ProfessionalLinksFormData = {
        linkedin: linkedin?.urlPerfil ?? '',
        linkedinPublic: linkedin?.esPublico ?? true,
        github: github?.urlPerfil ?? '',
        githubPublic: github?.esPublico ?? true,
      };

      setLinkIds({
        linkedinId: linkedin?.idRed,
        githubId: github?.idRed,
      });

      setStoredLinks(normalized);
      form.reset(normalized);

      showToast('Redes profesionales actualizadas correctamente.', 'success');
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

  const onDeleteLink = async (network: 'LinkedIn' | 'GitHub') => {
    setIsLoading(true);
    setServerError(null);

    try {
      if (network === 'LinkedIn' && linkIds.linkedinId) {
        await professionalLinksService.deleteProfessionalLink(linkIds.linkedinId);

        const updatedState: ProfessionalLinksFormData = {
          ...form.getValues(),
          linkedin: '',
          linkedinPublic: true,
        };

        setStoredLinks(updatedState);
        setLinkIds((prev) => ({ ...prev, linkedinId: undefined }));
        form.reset(updatedState);
      }

      if (network === 'GitHub' && linkIds.githubId) {
        await professionalLinksService.deleteProfessionalLink(linkIds.githubId);

        const updatedState: ProfessionalLinksFormData = {
          ...form.getValues(),
          github: '',
          githubPublic: true,
        };

        setStoredLinks(updatedState);
        setLinkIds((prev) => ({ ...prev, githubId: undefined }));
        form.reset(updatedState);
      }

      showToast(`${network} eliminado correctamente.`, 'success');
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : `No se pudo eliminar ${network}.`;
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
    onDeleteLink,
  };
};