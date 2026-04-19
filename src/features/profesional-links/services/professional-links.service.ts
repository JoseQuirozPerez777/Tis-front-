import type {
  ProfessionalLinksData,
  GetRedesSocialesResponse,
  SaveRedSocialResponse,
  RedSocialResponseDTO,
} from '../models/professional-links.model';
import type { RedSocialRequestDTO } from './professional-links.dto';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081';

const normalizeNombreRed = (value: string) => value.trim().toLowerCase();

export const professionalLinksService = {
  getProfessionalLinks: async (): Promise<ProfessionalLinksData> => {
    const token = sessionStorage.getItem('jwt');

    const response = await fetch(`${API_URL}/api/redes-sociales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'No se pudieron obtener las redes sociales');
    }

    const result: GetRedesSocialesResponse = await response.json();
    const redes = result.data ?? [];

    const linkedin = redes.find(
      (red) => normalizeNombreRed(red.nombreRed) === 'linkedin'
    );

    const github = redes.find(
      (red) => normalizeNombreRed(red.nombreRed) === 'github'
    );

    return {
      linkedin: linkedin?.urlPerfil ?? '',
      github: github?.urlPerfil ?? '',
    };
  },

  saveProfessionalLinks: async (
    links: ProfessionalLinksData,
    esPublico = true
  ): Promise<SaveRedSocialResponse> => {
    const token = sessionStorage.getItem('jwt');

    // 1. Obtener redes actuales
    const currentResponse = await fetch(`${API_URL}/api/redes-sociales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'No se pudieron obtener las redes actuales');
    }

    const currentResult: GetRedesSocialesResponse = await currentResponse.json();
    const actuales = currentResult.data ?? [];

    const linkedinActual = actuales.find(
      (red) => normalizeNombreRed(red.nombreRed) === 'linkedin'
    );

    const githubActual = actuales.find(
      (red) => normalizeNombreRed(red.nombreRed) === 'github'
    );

    const operaciones: Promise<unknown>[] = [];
    const nuevasRedes: RedSocialRequestDTO[] = [];

    const buildDto = (nombreRed: string, urlPerfil: string): RedSocialRequestDTO => ({
      nombreRed,
      urlPerfil,
      esPublico,
    });

    // LINKEDIN
    if (links.linkedin?.trim()) {
      if (linkedinActual) {
        operaciones.push(
          fetch(`${API_URL}/api/redes-sociales/${linkedinActual.idRed}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(buildDto('LinkedIn', links.linkedin.trim())),
          }).then(async (res) => {
            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              throw new Error(err.message || 'No se pudo actualizar LinkedIn');
            }
            return res.json() as Promise<SaveRedSocialResponse>;
          })
        );
      } else {
        nuevasRedes.push(buildDto('LinkedIn', links.linkedin.trim()));
      }
    } else if (linkedinActual) {
      operaciones.push(
        fetch(`${API_URL}/api/redes-sociales/${linkedinActual.idRed}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'No se pudo eliminar LinkedIn');
          }
          return res.json();
        })
      );
    }

    // GITHUB
    if (links.github?.trim()) {
      if (githubActual) {
        operaciones.push(
          fetch(`${API_URL}/api/redes-sociales/${githubActual.idRed}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(buildDto('GitHub', links.github.trim())),
          }).then(async (res) => {
            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              throw new Error(err.message || 'No se pudo actualizar GitHub');
            }
            return res.json() as Promise<SaveRedSocialResponse>;
          })
        );
      } else {
        nuevasRedes.push(buildDto('GitHub', links.github.trim()));
      }
    } else if (githubActual) {
      operaciones.push(
        fetch(`${API_URL}/api/redes-sociales/${githubActual.idRed}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'No se pudo eliminar GitHub');
          }
          return res.json();
        })
      );
    }

    // Crear nuevas
    if (nuevasRedes.length > 0) {
      operaciones.push(
        fetch(`${API_URL}/api/redes-sociales/registrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevasRedes),
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'No se pudieron registrar las redes sociales');
          }
          return res.json() as Promise<SaveRedSocialResponse>;
        })
      );
    }

    await Promise.all(operaciones);

    return {
      success: true,
      message: 'Redes profesionales actualizadas correctamente',
    };
  },

  getVisibleProfessionalLinks: (
    redes: RedSocialResponseDTO[]
  ): ProfessionalLinksData => {
    const linkedin = redes.find(
      (red) =>
        normalizeNombreRed(red.nombreRed) === 'linkedin' && red.esPublico
    );

    const github = redes.find(
      (red) =>
        normalizeNombreRed(red.nombreRed) === 'github' && red.esPublico
    );

    return {
      linkedin: linkedin?.urlPerfil ?? '',
      github: github?.urlPerfil ?? '',
    };
  },
};