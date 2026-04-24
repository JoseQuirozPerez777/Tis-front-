import { z } from 'zod';

export const professionalLinksSchema = z.object({
  nombreRed: z.enum(['LinkedIn', 'GitHub']),
  urlPerfil: z
    .string()
    .trim()
    .min(1, 'La URL es obligatoria.')
    .url('Ingresa una URL válida.'),
  esPublico: z.boolean(),
});

export type ProfessionalLinksFormData = z.infer<typeof professionalLinksSchema>;