import { z } from 'zod';

const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const optionalUrlField = z
  .string()
  .trim()
  .refine((value) => value === '' || isValidUrl(value), {
    message: 'Ingresa una URL válida.',
  });

export const professionalLinksSchema = z.object({
  linkedin: optionalUrlField,
  github: optionalUrlField,
});

export type ProfessionalLinksFormData = z.infer<typeof professionalLinksSchema>;