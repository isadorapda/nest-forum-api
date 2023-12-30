import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export type CreateUserDtoType = z.infer<typeof createUserSchema>;
