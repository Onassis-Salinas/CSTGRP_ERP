import { z } from 'zod';

export const editSchema = z.object({
  id: z.number().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export const createSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
