import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo')
    .regex(/^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre debe iniciar con mayúscula y no contener números'),

  profession: z
    .string()
    .min(1, 'La profesión es requerida')
    .max(80, 'La profesión es demasiado larga'),

  bio: z
    .string()
    .min(10, 'La biografía debe tener al menos 10 caracteres')
    .max(300, 'La biografía es demasiado larga'),

  telefono: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono es demasiado largo')
    .regex(/^[0-9]+$/, 'El teléfono solo debe contener números'),

  direccion: z
    .string()
    .min(3, 'La dirección debe tener al menos 3 caracteres')
    .max(120, 'La dirección es demasiado larga'),
    disponibilidad: z
  .enum(['Disponible', 'No disponible'])
  .default('Disponible'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;