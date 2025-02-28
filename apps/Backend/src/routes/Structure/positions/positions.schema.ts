import { z } from 'zod';

export const editSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  color: z.string().optional(),
});

export const createSchema = z.object({
  name: z.string(),
  color: z.string(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
