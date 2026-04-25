import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo'),

  profession: z.string()
    .min(1, 'La profesión es requerida')
    .max(50, 'La profesión es demasiado larga'),

  bio: z.string()
    .min(10, 'La biografía debe tener al menos 10 caracteres')
    .max(300, 'La biografía es demasiado larga'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;