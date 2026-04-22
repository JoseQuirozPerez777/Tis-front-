import { z } from 'zod';

const linkedinField = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' ||
      /^https?:\/\/(www\.)?linkedin\.com\/.+$/i.test(value),
    {
      message: 'Ingresa una URL válida de LinkedIn.',
    }
  );

const githubField = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' ||
      /^https?:\/\/(www\.)?github\.com\/.+$/i.test(value),
    {
      message: 'Ingresa una URL válida de GitHub.',
    }
  );

export const professionalLinksSchema = z.object({
  linkedin: linkedinField,
  linkedinPublic: z.boolean(),
  github: githubField,
  githubPublic: z.boolean(),
});

export type ProfessionalLinksFormData = z.infer<typeof professionalLinksSchema>;